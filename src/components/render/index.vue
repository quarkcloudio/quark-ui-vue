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
  <span v-if="typeof body === 'string' || typeof body === 'number'" v-html="sanitizedHtml" />
  <template v-else-if="body?.component">
    <div v-if="body.component === 'view'" :style="body.style">
      <Render :body="body.body" :data="data" />
    </div>
    <template v-else-if="body.component === 'image'">
      <AImage v-bind="body" />
    </template>
    <template v-else-if="body.component === 'col'">
      <ACol v-bind="body"><Render :body="body.body" :data="data" /></ACol>
    </template>
    <template v-else-if="body.component === 'row'">
      <ARow v-bind="body"><Render :body="body.body" :data="data" /></ARow>
    </template>
    <template v-else-if="body.component === 'statistic'">
      <AStatistic v-bind="body" />
    </template>
    <template v-else-if="body.component === 'descriptions'">
      <ProDescriptions v-bind="body" />
    </template>
    <template v-else-if="body.component === 'text'">
      <ATypographyText v-bind="body"><Render :body="body.body" :data="data" /></ATypographyText>
    </template>
    <template v-else-if="body.component === 'card'">
      <ProCard v-bind="body" :extra="undefined" :prop-extra="body.extra" :data="data" />
    </template>
    <template v-else-if="body.component === 'form'">
      <ProForm v-bind="body" :data="data" />
    </template>
    <template v-else-if="fieldNames.includes(body.component)">
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
        :data="data"
        @update:value="val => (data[body.name] = val)"
      />
    </template>
    <template v-else-if="body.component === 'table'">
      <ProTable v-bind="body" />
    </template>
    <template v-else-if="body.component === 'tabs'">
      <ProTabs v-bind="body" :data="data" />
    </template>
    <template v-else>Unknown component: {{ body.component }}.</template>
  </template>
  <template v-else>
    <template v-for="(item, _index) in body" :key="_index">
      <Render :body="item" :data="data" />
    </template>
  </template>
</template>

<style scoped></style>
