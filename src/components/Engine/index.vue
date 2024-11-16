<script setup lang="ts">
const props = withDefaults(defineProps<{
  api?: string;
}>(), {
  api: '',
});

const getComponent = async () => {
  const result = await useGet(props.api)
  console.log(result)
}

onMounted(() => {
  getComponent()
})

</script>

<template>
{{api}}
</template>

<style lang="less" scoped>
</style>
