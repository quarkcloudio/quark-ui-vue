<script setup lang="ts">
const props = withDefaults(defineProps<{
  api?: string;
}>(), {
  api: '',
});

const component = ref()

const getComponent = async () => {
  return await useGet(props.api)
}

onMounted(async () => {
  component.value = await getComponent()
})

</script>

<template>
  <render :body="component" />
</template>