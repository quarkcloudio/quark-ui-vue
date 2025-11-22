<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TransferDirection, TransferItem } from 'ant-design-vue/es/transfer';

interface TransferProps {
  api?: any;
  modelValue?: string[];
  dataSource?: TransferItem[];
  disabled?: boolean;
  selectionsIcon?: any;
  filterOption?: any;
  footer?: any;
  listStyle?: any;
  locale?: any;
  oneWay?: boolean;
  operations?: string[];
  operationStyle?: any;
  pagination?: any;
  selectAllLabels?: any;
  selectedKeys?: string[];
  showSearch?: boolean;
  showSelectAll?: boolean;
  status?: any;
  targetKeys?: string[];
  titles?: string[];
}

const props = withDefaults(defineProps<TransferProps>(), {
  modelValue: () => [],
  dataSource: () => [],
  disabled: false,
  selectionsIcon: undefined,
  filterOption: undefined,
  footer: undefined,
  listStyle: undefined,
  locale: undefined,
  oneWay: false,
  operations: () => [],
  operationStyle: undefined,
  pagination: undefined,
  selectAllLabels: undefined,
  showSearch: false,
  showSelectAll: true,
  status: undefined,
  titles: () => ['', ''],
  targetKeys: () => [],
  selectedKeys: () => []
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

// 响应式状态
const innerTargetKeys = ref<string[]>(props.modelValue);
const innerSelectedKeys = ref<string[]>(props.selectedKeys);

// 监听外部传入的值变化
watch(
  () => props.modelValue,
  newVal => {
    innerTargetKeys.value = newVal;
  },
  { immediate: true }
);

// 处理 transfer change 事件
const onTransferChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
  console.log('direction:', direction);
  console.log('moveKeys:', moveKeys);
  innerTargetKeys.value = nextTargetKeys;
  emit('update:modelValue', nextTargetKeys);
};

// 处理 select change 事件
const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  innerSelectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
};
</script>

<template>
  <ATransfer
    :data-source="dataSource"
    :disabled="disabled"
    :selections-icon="selectionsIcon"
    :filter-option="filterOption"
    :footer="footer"
    :list-style="listStyle"
    :locale="locale"
    :one-way="oneWay"
    :operations="operations"
    :operation-style="operationStyle"
    :pagination="pagination"
    :select-all-labels="selectAllLabels"
    :show-search="showSearch"
    :show-select-all="showSelectAll"
    :status="status"
    :titles="titles"
    :target-keys="innerTargetKeys"
    :selected-keys="innerSelectedKeys"
    @change="onTransferChange"
    @select-change="onSelectChange"
  >
    <template #render="item">
      {{ item?.title || '' }}
    </template>
  </ATransfer>
</template>
