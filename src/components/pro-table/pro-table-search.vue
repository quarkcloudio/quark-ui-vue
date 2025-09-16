<script setup lang="tsx">
import { reactive } from 'vue';
import { $t } from '@/locales';
import { useAntdForm } from '@/hooks/common/form';

interface ProTableSearchProps {
  defaultCollapsed?: boolean;
  exportApi?: string;
  exportText?: string;
  resetText?: string;
  searchText?: string;
  items?: any;
}

defineOptions({
  name: 'ProTableSearch'
});

const {
  defaultCollapsed = false,
  exportApi = undefined,
  exportText = $t('common.export'),
  resetText = $t('common.reset'),
  searchText = $t('common.search'),
  items = []
} = defineProps<ProTableSearchProps>();

const { formRef, validate } = useAntdForm();
const model: any = reactive({});

async function handleSubmit() {
  await validate();
}
</script>

<template>
  <ACollapse :default-active-key="defaultCollapsed ? '' : '1'" class="bg-white">
    <ACollapsePanel key="1" :header="searchText">
      <AForm ref="formRef" layout="inline" :model="model" @keyup.enter="handleSubmit">
        <ASpace>
          <ProFormField
            v-for="field in items"
            :key="field.componentkey"
            v-model:value="model[field.name]"
            :component="field.component"
            :name="field.name"
            :label="field.label"
            :rules="field.frontendRules"
            :field-props="{ ...field }"
          />
        </ASpace>
        <ASpace>
          <AButton @click="handleSubmit">
            {{ resetText }}
          </AButton>
          <AButton type="primary" @click="handleSubmit">
            {{ searchText }}
          </AButton>
          <AButton v-if="exportApi" type="primary">
            {{ exportText }}
          </AButton>
        </ASpace>
      </AForm>
    </ACollapsePanel>
  </ACollapse>
</template>
