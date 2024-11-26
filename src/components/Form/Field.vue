<script setup lang="ts">
const props = withDefaults(defineProps<any>(), {
  component: undefined,
});

const {
  component,
} = toRefs(props)
</script>
<template>
  <template v-if="component === 'textField'">
    <input type="text" />
  </template>
  <template v-else-if="component === 'viewB'">
    <div>这是 View B 的内容</div>
  </template>
  <template v-else>
    <div>这是 View C 的内容</div>
  </template>
</template>