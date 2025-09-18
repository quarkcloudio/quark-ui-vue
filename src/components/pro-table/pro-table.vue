<script setup lang="tsx">
import { computed } from 'vue';
import Render from '@/components/render/index.vue';

interface ProTableProps {
  columns: any[];
  datasource?: any[];
  headerTitle?: string;
  search?: any;
}

defineOptions({
  name: 'ProTable'
});

const { columns, datasource, headerTitle, search } = defineProps<ProTableProps>();

const parseColumns = () => {
  return columns.map(item => {
    const column: any = item;

    // 解析筛选项
    if (column.filters) {
      column.filters = column?.fieldProps?.options?.map((option: any) => ({
        text: option.label,
        value: option.value
      }));
    }

    // 解析渲染
    column.customRender = ({ text }: any) => {
      if (column.valueType === 'radio' || column.valueType === 'select') {
        return column.valueEnum[text];
      }
      if (column.valueType === 'option') {
        return text;
      }
      return <Render body={text} />;
    };
    return column;
  });
};

const parsedColumns = computed(() => parseColumns());
</script>

<template>
  <ProTableSearch :v-if="search?.items" v-bind="search" />
  <ACard :title="headerTitle" class="mt-16px">
    <template #extra>
      <ProTableHeaderOperation />
    </template>
    <ATable :columns="parsedColumns" :data-source="datasource" />
  </ACard>
</template>
