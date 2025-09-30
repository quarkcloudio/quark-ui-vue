<script setup lang="tsx">
import { ref, toRefs, watchEffect } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { Space } from 'ant-design-vue';
import Render from '@/components/render/index.vue';
import { useEngineStore } from '@/store/modules/engine';
import { fetchTableData } from '@/service/api';
import Action from '@/components/action/index.vue';

interface ProTableProps {
  rowKey: string;
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
  toolBar?: any;
  pagination?: any;
}

defineOptions({
  name: 'ProTable'
});

const props = defineProps<ProTableProps>();
const { rowKey, columns, headerTitle, search, toolBar } = toRefs(props);
const { engineApi } = useEngineStore();
const datasource = ref<any[]>(props.datasource || []);
const loading = ref(false);

const getColumnChecks = () => {
  const checks: AntDesign.TableColumnCheck[] = [];
  columns.value.forEach(column => {
    if (column.dataIndex) {
      checks.push({
        key: column.dataIndex as string,
        title: column.title as string,
        checked: true
      });
    }
  });
  return checks;
};

const columnChecks = ref<any[]>(getColumnChecks() || []);

const getColumns = () => {
  const columnMap = new Map<string, any>();

  columns.value.forEach(column => {
    if (column.dataIndex) {
      columnMap.set(column.dataIndex as string, column);
    }
  });

  const filteredColumns = columnChecks?.value?.filter(item => item.checked).map(check => columnMap.get(check.key));

  return filteredColumns?.map((item: any) => {
    const column: any = item;

    // 解析筛选项
    if (column.filters) {
      column.filters = column?.fieldProps?.options?.map((option: any) => ({
        text: option.label,
        value: option.value
      }));
    }

    // 解析渲染
    column.customRender = ({ text, record }: any) => {
      if (column.valueType === 'radio' || column.valueType === 'select') {
        return column.valueEnum[text];
      }
      if (column.valueType === 'option') {
        return (
          <Space>
            {column?.actions?.map((action: any) => {
              return <Action {...action} data={record} />;
            })}
          </Space>
        );
      }
      return <Render body={text} />;
    };

    return column;
  });
};

const parsedColumns = ref<any[]>(getColumns() || []);
const selectedRowKeys = ref<any[]>([]);

const pagination = ref<any>({
  total: props.pagination?.total || 0,
  current: props.pagination?.current || 1,
  pageSize: props.pagination?.pageSize || 10
});

const queryParams = ref<any>({
  filters: '',
  sorter: '',
  search: ''
});

watchEffect(() => {
  parsedColumns.value = getColumns();
});

const onSelectChange = (newSelectedRowKeys: any[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

const onRequest = async () => {
  loading.value = true;
  const { data }: any = await fetchTableData(engineApi, queryParams.value);
  datasource.value = data?.datasource || [];
  selectedRowKeys.value = [];
  loading.value = false;
  return data;
};

const handleTableChange: TableProps['onChange'] = async (page: any, filters: any, sorter: any) => {
  queryParams.value = {
    search: JSON.stringify(page),
    filters: JSON.stringify(filters),
    sorter: JSON.stringify(sorter)
  };
  const data = await onRequest();
  pagination.value = { ...data.pagination, current: page.current };
};
</script>

<template>
  <ProTableSearch :v-if="search?.items" v-bind="search" />
  <ACard :title="headerTitle" class="mt-16px">
    <template #extra>
      <div class="flex items-center gap-x-12px py-12px">
        <ProTableToolBar :actions="toolBar?.actions" :selected-row-keys="selectedRowKeys" @refresh="onRequest" />
        <ProTableHeaderOperation v-model:columns="columnChecks" :loading="loading" @refresh="onRequest" />
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
