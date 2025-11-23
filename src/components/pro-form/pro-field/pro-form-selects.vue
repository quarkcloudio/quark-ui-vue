<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchSelectsOptions } from '@/service/api';
import { useEngine } from '@/hooks/common/engine';

// Props 定义
interface SelectsProps {
  body: Array<any>;
}

const props = defineProps<SelectsProps>();

// State
const random = ref(0);
const items = ref([...props.body]); // 深拷贝防止修改原始props
const { getEngineFormRef } = useEngine();

// Methods
const getFields = async () => {
  // 深拷贝一份 body 来防止直接修改 props
  const fieldsCopy = [...items.value];

  // 收集需要加载选项的依赖项
  const loadPromises: Array<Promise<void>> = [];

  for (const item of fieldsCopy) {
    const formValues = getEngineFormRef()?.getFieldsValue();
    const value = formValues?.[item.name];

    if (value && item.load) {
      fieldsCopy.forEach((subItem, key) => {
        if (item.load.field === subItem.name && item.load.api) {
          const promise = fetchSelectsOptions(item.load.api, {
            search: value
          }).then((result: any) => {
            fieldsCopy[key].options = result.data;
          });
          loadPromises.push(promise);
        }
      });
    }
  }

  // 并发执行所有请求
  await Promise.all(loadPromises);

  return fieldsCopy;
};

// 初始化字段
const setInitialFields = async () => {
  if (!Array.isArray(items.value)) {
    return;
  }

  const newFields = await getFields();
  items.value = [...newFields]; // 更新items
};

const onSelectChange = async (value: any, name: string, load: any = null) => {
  const fieldsValue: Record<string, any> = {};

  if (load) {
    const updatedItems = await Promise.all(
      items.value.map(async (item: any) => {
        if (load.field === item.name && load.api) {
          try {
            const result = await fetchSelectsOptions(load.api, {
              search: value
            });
            return {
              ...item,
              options: result.data
            };
          } catch (error) {
            console.error(`Failed to fetch options for ${item.name}:`, error);
            return item;
          }
        }
        return item;
      })
    );

    items.value = updatedItems;
    fieldsValue[load.field] = undefined;
  }

  fieldsValue[name] = value;

  getEngineFormRef()?.setFieldsValue(fieldsValue);
  random.value = Math.random(); // 触发重新渲染
};

// Lifecycle
onMounted(() => {
  setInitialFields();
});
</script>

<template>
  <div>
    <template v-for="item in items" :key="`${item.name}-${random}`">
      <AFormItem
        v-if="item.component === 'selectField'"
        :extra="item.extra"
        :help="item.help || undefined"
        :label="item.label"
        :name="item.name"
        :rules="item.frontendRules"
        :tooltip="item.tooltip"
      >
        <ASelect
          :allow-clear="item.allowClear"
          :disabled="item.disabled"
          :mode="item.mode"
          :options="item.options"
          :placeholder="item.placeholder"
          :size="item.size"
          :style="item.style || {}"
          @change="value => onSelectChange(value, item.name, item.load)"
        />
      </AFormItem>

      <AFormItem v-else :extra="item.extra" :help="item.help || undefined" :label="item.label" :name="item.name">
        <span>无{{ item.component }}组件</span>
      </AFormItem>
    </template>
  </div>
</template>
