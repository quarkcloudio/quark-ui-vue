<script setup lang="ts">
const props = withDefaults(defineProps<{
  addonAfter?: any
  addonBefore?: any
  allowClear?: boolean
  bordered?: boolean
  defaultValue?: string
  disabled?: boolean
  id?: string
  maxlength?: number
  prefix?: any
  showCount?: boolean
  status?: string
  size?: string
  suffix?: any
  type?: string
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
  type: 'text',
})

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
  type,
} = toRefs(props)
</script>

<template>
  <a-input
    :id="id"
    :addon-after="addonAfter"
    :addon-before="addonBefore"
    :allow-clear="allowClear"
    :bordered="bordered"
    :default-value="defaultValue"
    :disabled="disabled"
    :maxlength="maxlength"
    :prefix="prefix"
    :show-count="showCount"
    :status="status"
    :size="size"
    :suffix="suffix"
    :type="type"
  />
</template>
