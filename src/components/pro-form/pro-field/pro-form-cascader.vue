<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import { fetchCascaderOptions } from '@/service/api';

const props = withDefaults(
  defineProps<
    {
      api?: string | null;
      style?: object;
      options?: any[];
      onChange?: (value: any) => void;
    } & CascaderProps
  >(),
  {
    api: null,
    style: () => ({}),
    options: () => []
  }
);

const emit = defineEmits<{
  (e: 'update:value', value: any): void;
  (e: 'change', value: any): void;
}>();

const selectOptions = ref(props.options);
const level = ref(0);
const spinning = ref(true);
const random = ref(0);

// 计算属性替代原来的 getSelectOptions 变量
const getSelectOptions = computed(() => selectOptions.value || props.options);

// 加载选项数据
const loadOptions = async (levelParam: number = 0) => {
  if (!props.api) return [];

  const result = await fetchCascaderOptions(props.api, {
    search: levelParam === 0 ? 0 : props.value?.[levelParam - 1],
    level: levelParam
  });

  const data = result.data;
  level.value = levelParam;

  if (!props.value) {
    return data;
  }

  if (levelParam >= props.value.length) {
    return [];
  }

  if (data && Array.isArray(data)) {
    await Promise.all(
      data.map(async (item: any) => {
        if (item.value === props.value?.[levelParam]) {
          const children = await loadOptions(levelParam + 1);
          if (children?.length > 0) {
            item.children = children;
          }
        }
      })
    );
  }

  return data;
};

// 初始化选项
const initOptions = async () => {
  spinning.value = true;
  if (props.api) {
    const getOptions: any = await loadOptions(0);
    selectOptions.value = getOptions;
  }
  spinning.value = false;
};

// 根据值初始化选项
const initValueOptions = async () => {
  spinning.value = true;
  if (props.api && props.value && level.value < props.value.length - 1) {
    const getOptions: any = await loadOptions(0);
    selectOptions.value = getOptions;
  }
  spinning.value = false;
};

// 处理选择变化
const onSelectChange = (value: any) => {
  emit('update:value', value);
  if (props.onChange) {
    props.onChange(value);
  }
  emit('change', value);
};

// 动态加载数据
const loadData = (selectedOptions: any) => {
  const targetOption = selectedOptions[selectedOptions.length - 1];
  targetOption.loading = true;

  setTimeout(async () => {
    targetOption.loading = false;

    if (!props.api) return;

    const result = await fetchCascaderOptions(props.api, {
      search: targetOption.value,
      level: selectedOptions.length
    });

    targetOption.children = result.data;
    selectOptions.value = [...selectOptions.value];
    random.value = Math.random();
  }, 300);
};

// 生命周期钩子
onMounted(() => {
  initOptions();
});

// 监听值的变化
watch(
  () => props.value,
  () => {
    initValueOptions();
  },
  { deep: true }
);

// 监听选项变化
watch(
  () => props.options,
  newOptions => {
    selectOptions.value = newOptions;
  }
);
</script>

<template>
  <ASpin v-if="api" :style="{ background: 'rgba(255,255,255,0.8)', ...style }" :spinning="spinning" size="small">
    <ACascader
      :size="size"
      :load-data="loadData"
      :placeholder="placeholder"
      :style="style"
      :allow-clear="allowClear"
      :value="value"
      :options="getSelectOptions"
      change-on-select
      @change="onSelectChange"
    />
  </ASpin>
  <ACascader
    v-else
    :size="size"
    :placeholder="placeholder"
    :style="style"
    :allow-clear="allowClear"
    :value="value"
    :options="getSelectOptions"
    @change="onSelectChange"
  />
</template>
