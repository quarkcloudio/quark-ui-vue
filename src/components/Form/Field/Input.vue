<script setup lang="ts">
const props = withDefaults(defineProps<{
  addonAfter?: any;
  addonBefore?: any;
  allowClear?: boolean;
}>(), {
  addonAfter: undefined,
  addonBefore: undefined,
  allowClear: undefined,
});

const { addonAfter, addonBefore, allowClear } = toRefs(props)
</script>
<template>
  <a-input
    :addonAfter="addonAfter"
    :addonBefore="addonBefore"
    :allowClear="allowClear"
  >
  
  </a-input>
</template>