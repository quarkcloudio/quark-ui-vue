<script setup lang="tsx">
import { computed, toRefs } from 'vue';
import DOMPurify from 'dompurify';

interface RenderProps {
  body: any;
  data?: any;
}

defineOptions({
  name: 'Render'
});

const props = defineProps<RenderProps>();
const { body, data } = toRefs(props);

const fieldNames = [
  'textField',
  'passwordField',
  'textAreaField',
  'inputNumberField',
  'iconField',
  'idField',
  'hiddenField',
  'checkboxField',
  'radioField',
  'imageField',
  'fileField',
  'switchField',
  'selectField',
  'treeField',
  'cascaderField',
  'dateField',
  'weekField',
  'monthField',
  'quarterField',
  'yearField',
  'datetimeField',
  'dateRangeField',
  'datetimeRangeField',
  'timeField',
  'timeRangeField',
  'displayField',
  'editorField',
  'searchField',
  'mapField',
  'geofenceField',
  'listField',
  'groupField',
  'selects',
  'treeSelectField',
  'spaceField',
  'compactField',
  'fieldsetField',
  'dependencyField',
  'transferField',
  'imageCaptchaField',
  'smsCaptchaField',
  'imagePickerField',
  'skuField'
];

// 安全地处理HTML内容
const sanitizedHtml = computed(() => {
  if (typeof body.value === 'string') {
    return DOMPurify.sanitize(body.value);
  }
  return body.value;
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="typeof body === 'string' || typeof body === 'number'" v-html="sanitizedHtml" />
  <div v-else-if="body?.component">
    <div v-if="body.component === 'view'" :style="body.style">
      <Render :body="body.body" :data="data" />
    </div>
    <div v-else-if="body.component === 'image'">
      <AImage v-bind="body" />
    </div>
    <div v-else-if="body.component === 'card'">
      <ProCard v-bind="body" :extra="undefined" :prop-extra="body.extra" />
    </div>
    <div v-else-if="body.component === 'form'">
      <ProForm v-bind="body" :data="data" />
    </div>
    <div v-else-if="fieldNames.includes(body.component)">
      <ProFormField
        :key="body.componentkey"
        :field-props="{ ...body }"
        :model="data"
        :value="data[body.name]"
        :component="body.component"
        :name="body.name"
        :label="body.label"
        :rules="body.frontendRules"
        :tooltip="body.tooltip"
        :colon="body.colon"
        :extra="body.extra"
        :required="body.required"
        :help="body.help"
        :wrapper-col="body.wrapperCol"
        @update:value="val => (data[body.name] = val)"
      />
    </div>
    <div v-else-if="body.component === 'table'">
      <ProTable v-bind="body" />
    </div>
    <div v-else-if="body.component === 'tabs'">
      <ProTabs v-bind="body" />
    </div>
    <div v-else>Unknown component: {{ body.component }}.</div>
  </div>
  <div v-else>
    <div v-for="(item, index) in body" :key="index">
      <Render :body="item" :data="data" />
    </div>
  </div>
</template>

<style scoped></style>
