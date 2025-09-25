<script setup lang="tsx">
import { computed, ref, toRefs, watchEffect } from 'vue';
import { Space } from 'ant-design-vue';
import Render from '@/components/render/index.vue';
import { useEngineStore } from '@/store/modules/engine';
import { fetchEngineComponent } from '@/service/api';
import Action from '@/components/action/index.vue';

interface ProTableProps {
  rowKey: string;
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
  toolBar?: any;
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
const hasSelected = computed(() => selectedRowKeys.value.length > 0);
console.log(hasSelected);

watchEffect(() => {
  parsedColumns.value = getColumns();
});

const onSelectChange = (newSelectedRowKeys: any[]) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

const onRequest = async () => {
  loading.value = true;
  const { data }: any = await fetchEngineComponent(engineApi);
  datasource.value = data?.datasource || [];
  loading.value = false;
};
</script>

<template>
  <ProTableSearch :v-if="search?.items" v-bind="search" />
  <ACard :title="headerTitle" class="mt-16px">
    <template #extra>
      <div class="flex items-center gap-x-12px py-12px">
        <ProTableToolBar :actions="toolBar?.actions" />
        <ProTableHeaderOperation v-model:columns="columnChecks" :loading="loading" @refresh="onRequest" />
      </div>
    </template>
    <ATable
      :row-key="rowKey"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="parsedColumns"
      :data-source="datasource"
      :loading="loading"
    />
  </ACard>
</template>
