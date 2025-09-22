<script setup lang="ts">
defineOptions({
  name: 'ProCard'
});

interface Props {
  componentkey?: string;
  title?: string;
  propExtra?: any[];
  body?: any;
}

const { componentkey, title, propExtra, body } = defineProps<Props>();
</script>

<template>
  <ACard :key="componentkey" :title="title">
    <template #extra>
      <Action v-for="action in propExtra" :key="action.componentkey" v-bind="action"></Action>
    </template>
    <Render :body="body" />
  </ACard>
</template>

<style scoped></style>
