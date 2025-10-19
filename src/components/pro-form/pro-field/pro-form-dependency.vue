<script setup lang="ts">
import { computed } from 'vue';
import { useEngine } from '@/hooks/common/engine';

interface ProFormDependencyProps {
  name?: string[];
}

const props = defineProps<ProFormDependencyProps>();

const { getEngineFormRef } = useEngine();

const formValues = computed(() => {
  const values = getEngineFormRef()?.getFieldsValue();
  // 检查 values 是否为对象
  if (values && typeof values === 'object') {
    // 如果 props.name 未定义，返回整个对象
    if (!props.name) {
      return values;
    }

    // 如果 props.name 已定义，只返回指定的字段
    const filteredValues: Record<string, any> = {};
    props.name.forEach(key => {
      if (key in values) {
        filteredValues[key] = values[key];
      }
    });
    return filteredValues;
  }

  return values;
});
</script>

<template>
  <slot :values="formValues" />
</template>
