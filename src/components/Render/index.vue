<script setup lang="ts">
const props = withDefaults(defineProps<{
  body?: any;
  data?: any;
  callback?: any;
}>(), {
  body: undefined,
  data: undefined,
  callback: undefined,
});

</script>

<template>
{{props.body}}
</template>