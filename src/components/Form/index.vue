<script lang="ts" setup>
function onFinish(values: any) {
  console.log('Success:', values)
}

function onFinishFailed(errorInfo: any) {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-form
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  />
</template>
