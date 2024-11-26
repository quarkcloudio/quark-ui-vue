<script setup lang="ts">
const props = withDefaults(defineProps<{
  addonAfter?: any;
  addonBefore?: any;
  allowClear?: boolean;
  bordered?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  maxlength?: number;
  prefix?: any;
  showCount?: boolean;
  status?: string;
  size?: string;
  suffix?: any;
  type?: string;
}>(), {
  addonAfter: undefined,
  addonBefore: undefined,
  allowClear: undefined,
  bordered: undefined,
  defaultValue: undefined,
  disabled: false,
  id: undefined,
  maxlength: undefined,
  prefix: undefined,
  showCount: false,
  status: undefined,
  size: undefined,
  suffix: undefined,
  type: "text",
});

const {
  addonAfter,
  addonBefore,
  allowClear,
  bordered,
  defaultValue,
  disabled,
  id,
  maxlength,
  prefix,
  showCount,
  status,
  size,
  suffix,
  type
} = toRefs(props)
</script>
<template>
  <a-input
    :addonAfter="addonAfter"
    :addonBefore="addonBefore"
    :allowClear="allowClear"
    :bordered="bordered"
    :defaultValue="defaultValue"
    :disabled="disabled"
    :id="id"
    :maxlength="maxlength"
    :prefix="prefix"
    :showCount="showCount"
    :status="status"
    :size="size"
    :suffix="suffix"
    :type="type"
  >
  
  </a-input>
</template>