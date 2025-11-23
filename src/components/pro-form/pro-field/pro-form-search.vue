<script setup lang="tsx">
import { computed, onMounted, ref, watch } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { fetchSearchOptions } from '@/service/api';

// Props 定义
interface SearchProps {
  allowClear?: boolean;
  api?: string | null;
  mode?: any;
  options?: Array<{ label: string; value: any }>;
  placeholder?: string;
  size?: any;
  style?: object;
  value?: any;
}

const props = withDefaults(defineProps<SearchProps>(), {
  allowClear: false,
  api: null,
  mode: undefined,
  options: () => [],
  placeholder: undefined,
  size: undefined,
  style: () => ({}),
  value: null
});

// Emits 定义
const emit = defineEmits<{
  (e: 'update:value', value: any): void;
  (e: 'change', value: any): void;
}>();

// State
const selectOptions = ref<Array<{ label: string; value: any }> | undefined>(undefined);
const loading = ref(false);
const timeout = ref<number | null>(null);

// Computed
const getSelectOptions = computed(() => {
  return selectOptions.value || props.options;
});

// Icons
const antIcon = <LoadingOutlined spin style={{ fontSize: '14px' }} />;

// Methods
const onInputSearch = (searchValue: any, type = 'label') => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }

  if (!props.api) {
    loading.value = false;
    return;
  }

  if (searchValue) {
    loading.value = true;
    timeout.value = setTimeout(async () => {
      try {
        const result: any = await fetchSearchOptions(props.api!, {
          search: searchValue,
          type
        });
        selectOptions.value = result.data;
      } finally {
        loading.value = false;
      }
    }, 300) as unknown as number;
  }
};

const triggerChange = (changedValue: any) => {
  emit('update:value', changedValue);
  emit('change', changedValue);
};

const onSelectChange = (newValue: any) => {
  triggerChange(newValue);
};

// Watchers
watch(
  () => props.value,
  newValue => {
    if (newValue && (!getSelectOptions.value || getSelectOptions.value.length === 0)) {
      loading.value = true;
      onInputSearch(newValue, 'value');
    } else if (newValue && getSelectOptions.value && getSelectOptions.value.length > 0) {
      const hasValue = getSelectOptions.value.some((option: any) => option.value === newValue);
      if (!hasValue) {
        loading.value = true;
        onInputSearch(newValue, 'value');
      }
    }
  },
  { immediate: true }
);

// Cleanup timeout on unmount
onMounted(() => {
  // 可以在这里做初始化操作
});
</script>

<template>
  <ASpin :spinning="loading" :indicator="antIcon" size="small" :style="style">
    <ASelect
      show-search
      :allow-clear="allowClear"
      :default-active-first-option="false"
      :filter-option="false"
      :mode="mode"
      :not-found-content="null"
      :placeholder="placeholder"
      :show-arrow="false"
      :size="size"
      :style="style"
      :value="value || undefined"
      @change="onSelectChange"
      @search="onInputSearch"
    >
      <ASelectOption v-for="option in getSelectOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </ASelectOption>
    </ASelect>
  </ASpin>
</template>
