<script setup lang="ts">
const props = withDefaults(defineProps<{
  fieldProps?: any
}>(), {
  fieldProps: undefined,
})

const {
  fieldProps,
} = toRefs(props)
</script>

<template>
  <template v-if="fieldProps.component === 'textField'">
    <input type="text">
  </template>
  <template v-else-if="fieldProps.component === 'viewB'">
    <div>这是 View B 的内容</div>
  </template>
  <template v-else>
    <div>这是 View C 的内容</div>
  </template>
</template>
