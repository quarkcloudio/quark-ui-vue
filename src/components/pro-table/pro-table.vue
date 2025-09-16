<script setup lang="tsx">
import { computed } from 'vue';

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
    const column: any = {};
    column.key = item.dataIndex;
    column.dataIndex = item.dataIndex;
    column.title = item.title;
    return column;
  });
};

const parsedColumns = computed(() => parseColumns());
</script>

<template>
  <ProTableSearch :v-if="search?.items" v-bind="search" />
  <ACard :title="headerTitle" class="mt-16px">
    <ATable :columns="parsedColumns" :data-source="datasource" />
  </ACard>
</template>
