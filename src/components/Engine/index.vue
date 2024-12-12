<script setup lang="ts">
const props = withDefaults(defineProps<{
  api?: string
}>(), {
  api: '',
})

const component = ref()

async function getComponent() {
  return await useGet(props.api)
}

onMounted(async () => {
  component.value = await getComponent()
})

watch(() => component.value, (val) => {
  document.title = val?.title
})
</script>

<template>
  <render :body="component" />
</template>
