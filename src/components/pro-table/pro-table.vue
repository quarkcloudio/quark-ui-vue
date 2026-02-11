<script setup lang="tsx">
import { computed, ref, toRefs, watch } from 'vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';
import { Space } from 'ant-design-vue';
import Render from '@/components/render/index.vue';
import { useEngine } from '@/hooks/common/engine';
import { fetchTableData, fetchTableEditableAction } from '@/service/api';
import Action from '@/components/action/index.vue';

interface ProTableProps {
  rowKey: string;
  columns: TableColumnType[];
  datasource?: Record<string, any>[];
  headerTitle?: string;
  search?: Record<string, any>;
  toolBar?: Record<string, any>;
  treeBar?: Record<string, any>;
  pagination?: any;
}

defineOptions({
  name: 'ProTable'
});

const props = defineProps<ProTableProps>();
const { rowKey, headerTitle, search, treeBar } = toRefs(props);
const { getEngineApi } = useEngine();
const columns = ref<any[]>(props.columns || []);
const toolBar = ref<Record<string, any>>(props.toolBar || {});
const datasource = ref<Record<string, any>[]>(props.datasource || []);
const loading = ref(false);
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
const searchValue = ref<string>('');

// 重置
const onReset = () => {
  queryParams.value = {
    filters: {},
    sorter: {},
    search: {},
    pagination: { current: 1, pageSize: pagination.value?.pageSize || 10 }
  };
};

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

// 获取 value 对应的 label
const getValueLabel = (options: any[], value: any) => {
  const option = options.find(item => item.value === value);
  return option ? option.label : value;
};

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
        col.filters = Object.entries(col.valueEnum || {}).map(([key, value]) => ({
          text: value,
          value: key
        }));
      }

      // 自定义渲染
      col.customRender = ({ text, record }: any) => {
        if (col.valueEnum?.[text]) {
          return col.valueEnum?.[text];
        }
        switch (col.valueType) {
          case 'radio':
            return getValueLabel(col?.fieldProps?.options || [], text);
          case 'checkbox':
            return getValueLabel(col?.fieldProps?.options || [], text);
          case 'select':
            return getValueLabel(col?.fieldProps?.options || [], text);
          case 'option':
            return (
              <Space>
                {col?.actions?.map((action: any) => <Action {...action} data={record} onClick={onReset} />)}
              </Space>
            );
          default:
            return <Render body={text} />;
        }
      };

      return col;
    });
};

const parsedColumns = ref<any[]>(getColumns());
const selectedRowKeys = ref<any[]>([]);

const onRequest = async (newQueryParams: any = queryParams.value) => {
  loading.value = true;
  try {
    const queryData: any = {};
    queryData[treeBar?.value?.name || ''] = JSON.stringify(newQueryParams[treeBar?.value?.name || '']);
    queryData.filters = JSON.stringify(newQueryParams.filters);
    queryData.sorter = JSON.stringify(newQueryParams.sorter);
    queryData.search = JSON.stringify(newQueryParams.search);
    queryData.pagination = JSON.stringify(newQueryParams.pagination);
    const { data }: any = await fetchTableData(getEngineApi(), queryData);
    columns.value = data?.columns || [];
    toolBar.value = { ...toolBar.value, ...data.toolBar };
    datasource.value = data?.datasource || [];
    selectedRowKeys.value = [];
    pagination.value = { ...pagination.value, ...data.pagination };
  } finally {
    loading.value = false;
  }
};

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
    await onRequest(newVal);
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

// 导出（这里只是触发请求，可以扩展成下载逻辑）
const onExport = () => {
  queryParams.value = { ...queryParams.value };
};

// 计算属性会自动追踪依赖变化
const treeData = computed(() => {
  const loop = (data: any): any => {
    return (
      data?.reduce((acc: any, item: any) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue.value);

        if (index > -1) {
          acc.push({ ...item });
        } else if (item.children) {
          const filteredChildren = loop(item.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren });
          }
        }
        return acc;
      }, []) || []
    );
  };

  return loop(treeBar.value?.treeData);
});

// 树形选择改变
const onTreeBarSelectChange = (newSelectedKeys: any[], _info: any) => {
  const data: any = {};
  data[treeBar?.value?.name || ''] = newSelectedKeys;
  queryParams.value = {
    ...queryParams.value,
    pagination: { current: 1, pageSize: pagination.value?.pageSize || 10 },
    ...data
  };
};

const onEditableSave = async (record: any, model: any, editable: any) => {
  const res = await fetchTableEditableAction(editable.action, { id: record.id, ...model });
  if (!res.error) {
    await onRequest();
  }
};
</script>

<template>
  <ARow v-if="treeBar?.treeData" :gutter="16">
    <ACol :span="4">
      <ACard class="h-full w-full">
        <AInputSearch
          v-model:value="searchValue"
          style="margin-bottom: 8px"
          :placeholder="treeBar?.placeholder"
          :allow-clear="true"
        />
        <ATree
          :show-line="treeBar?.showLine"
          :tree-data="treeData"
          :default-expand-all="treeBar?.defaultExpandAll"
          @select="onTreeBarSelectChange"
        />
      </ACard>
    </ACol>
    <ACol :span="20">
      <ProTableSearch v-if="search?.items" v-bind="search" @search="onSearch" @reset="onReset" @export="onExport" />
      <ACard :title="headerTitle" class="mt-16px">
        <template #extra>
          <div class="flex items-center gap-x-12px py-12px">
            <ProTableToolBar :actions="toolBar?.actions" :selected-row-keys="selectedRowKeys" @refresh="onRequest" />
            <ProTableHeaderOperation v-model:columns="columnChecks" @refresh="onRequest" />
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
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="(column as any)?.editable">
              <ProTableEditable
                :data-index="column.dataIndex"
                :column="column"
                :text="text"
                :record="record"
                @save="onEditableSave"
              />
            </template>
          </template>
        </ATable>
      </ACard>
    </ACol>
  </ARow>
  <div v-else>
    <ProTableSearch v-if="search?.items" v-bind="search" @search="onSearch" @reset="onReset" @export="onExport" />
    <ACard :title="headerTitle" class="mt-16px">
      <template #extra>
        <div class="flex items-center gap-x-12px py-12px">
          <ProTableToolBar :actions="toolBar?.actions" :selected-row-keys="selectedRowKeys" @refresh="onRequest" />
          <ProTableHeaderOperation v-model:columns="columnChecks" @refresh="onRequest" />
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
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="(column as any)?.editable">
            <ProTableEditable
              :data-index="column.dataIndex"
              :column="column"
              :text="text"
              :record="record"
              @save="onEditableSave"
            />
          </template>
        </template>
      </ATable>
    </ACard>
  </div>
</template>
