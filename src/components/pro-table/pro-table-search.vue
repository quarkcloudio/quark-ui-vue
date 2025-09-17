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
  defaultCollapsed = true,
  exportApi,
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
  <ACollapse :default-active-key="defaultCollapsed ? '1' : '0'" :bordered="false" class="card-wrapper bg-white">
    <ACollapsePanel key="1">
      <template #header>
        <span class="text-size-16px">{{ searchText }}</span>
      </template>
      <AForm
        ref="formRef"
        :model="model"
        :label-col="{
          span: 5,
          md: 7
        }"
      >
        <ARow :gutter="[16, 16]" wrap>
          <ACol v-for="field in items" :key="field.componentkey" :span="24" :md="12" :lg="6">
            <ProFormField
              v-model:value="model[field.name]"
              :component="field.component"
              :name="field.name"
              :label="field.label"
              :rules="field.frontendRules"
              :field-props="{ ...field }"
            />
          </ACol>
          <div class="flex-1">
            <AFormItem class="m-0">
              <div class="w-full flex-y-center justify-end gap-12px">
                <AButton @click="handleSubmit">
                  <template #icon>
                    <icon-ant-design:redo-outlined class="align-sub text-icon" />
                  </template>
                  <span class="ml-8px">{{ resetText }}</span>
                </AButton>
                <AButton type="primary" ghost @click="handleSubmit">
                  <template #icon>
                    <icon-ant-design:search-outlined class="align-sub text-icon" />
                  </template>
                  <span class="ml-8px">{{ searchText }}</span>
                </AButton>
                <AButton v-if="exportApi" type="primary" ghost>
                  <template #icon>
                    <icon-ant-design:download-outlined class="align-sub text-icon" />
                  </template>
                  {{ exportText }}
                </AButton>
              </div>
            </AFormItem>
          </div>
        </ARow>
      </AForm>
    </ACollapsePanel>
  </ACollapse>
</template>
