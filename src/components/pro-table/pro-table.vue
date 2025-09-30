<script setup lang="tsx">
import { ref, toRefs, watch } from 'vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';
import { Space } from 'ant-design-vue';
import Render from '@/components/render/index.vue';
import { useEngineStore } from '@/store/modules/engine';
import { fetchTableData } from '@/service/api';
import Action from '@/components/action/index.vue';

interface ProTableProps {
  rowKey: string;
  columns: TableColumnType[];
  datasource?: Record<string, any>[];
  headerTitle?: string;
  search?: Record<string, any>;
  toolBar?: Record<string, any>;
  pagination?: any;
}

defineOptions({
  name: 'ProTable'
});

const props = defineProps<ProTableProps>();
const { rowKey, columns, headerTitle, search, toolBar } = toRefs(props);
const { engineApi } = useEngineStore();

const datasource = ref<Record<string, any>[]>(props.datasource || []);
const loading = ref(false);

// 列选择器
const getColumnChecks = () =>
  columns.value
    .filter(col => col.dataIndex)
    .map(col => ({
      key: col.dataIndex as string,
      title: col.title as string,
      checked: true
    }));

const columnChecks = ref<any[]>(getColumnChecks());

// 渲染列
const getColumns = () => {
  const columnMap = new Map<string, any>();
  columns.value.forEach(col => {
    if (col.dataIndex) {
      columnMap.set(col.dataIndex as string, col);
    }
  });

  return columnChecks.value
    ?.filter(item => item.checked)
    .map(check => {
      const col = { ...columnMap.get(check.key) };

      // 解析筛选项
      if (col.filters) {
        col.filters = col?.fieldProps?.options?.map((opt: any) => ({
          text: opt.label,
          value: opt.value
        }));
      }

      // 自定义渲染
      col.customRender = ({ text, record }: any) => {
        switch (col.valueType) {
          case 'radio':
          case 'select':
            return col.valueEnum?.[text] ?? text;
          case 'option':
            return <Space>{col?.actions?.map((action: any) => <Action {...action} data={record} />)}</Space>;
          default:
            return <Render body={text} />;
        }
      };

      return col;
    });
};

const parsedColumns = ref<any[]>(getColumns());
const selectedRowKeys = ref<any[]>([]);

const pagination = ref<any>({
  total: props.pagination?.total || 0,
  current: props.pagination?.current || 1,
  pageSize: props.pagination?.pageSize || 10,
  showSizeChanger: true
});

const queryParams = ref<any>({
  filters: {},
  sorter: {},
  search: {},
  pagination: {
    current: pagination.value?.current,
    pageSize: pagination.value?.pageSize
  }
});

// 监听列变化
watch(
  [columns, columnChecks],
  () => {
    parsedColumns.value = getColumns();
  },
  { deep: true }
);

// 监听 queryParams 自动请求
watch(
  queryParams,
  async newVal => {
    if (loading.value) return;
    loading.value = true;
    try {
      const { data }: any = await fetchTableData(engineApi, {
        filters: JSON.stringify(newVal.filters),
        sorter: JSON.stringify(newVal.sorter),
        search: JSON.stringify({ ...newVal.search, ...newVal.pagination })
      });
      datasource.value = data?.datasource || [];
      selectedRowKeys.value = [];
      pagination.value = { ...pagination.value, ...data.pagination };
    } finally {
      loading.value = false;
    }
  },
  { deep: true, immediate: true }
);

// 行选择
const onSelectChange = (newSelectedRowKeys: any[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

// 表格交互改变
const handleTableChange: TableProps['onChange'] = (page, filters, sorter) => {
  queryParams.value = {
    ...queryParams.value,
    pagination: page,
    filters,
    sorter
  };
};

// 搜索
const onSearch = (values: any) => {
  queryParams.value = {
    ...queryParams.value,
    pagination: { current: 1, pageSize: pagination.value?.pageSize || 10 },
    search: values
  };
};

// 重置
const onReset = () => {
  queryParams.value = {
    filters: {},
    sorter: {},
    search: {},
    pagination: { current: 1, pageSize: pagination.value?.pageSize || 10 }
  };
};

// 导出（这里只是触发请求，可以扩展成下载逻辑）
const onExport = () => {
  queryParams.value = { ...queryParams.value };
};
</script>

<template>
  <ProTableSearch v-if="search?.items" v-bind="search" @search="onSearch" @reset="onReset" @export="onExport" />
  <ACard :title="headerTitle" class="mt-16px">
    <template #extra>
      <div class="flex items-center gap-x-12px py-12px">
        <ProTableToolBar :actions="toolBar?.actions" :selected-row-keys="selectedRowKeys" @refresh="onReset" />
        <ProTableHeaderOperation v-model:columns="columnChecks" @refresh="onReset" />
      </div>
    </template>
    <ATable
      :row-key="rowKey"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="parsedColumns"
      :data-source="datasource"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    />
  </ACard>
</template>
