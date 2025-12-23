<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue';

interface ProTableEditableProps {
  alwaysEditing?: boolean;
  text: any;
  column: any;
  dataIndex: any;
  record: any;
}

defineOptions({
  name: 'ProTableEditable'
});

const { alwaysEditing, text, column, dataIndex, record } = defineProps<ProTableEditableProps>();
const model: any = reactive({
  [dataIndex]: record[dataIndex]
});
const editing = ref(false);
const emit = defineEmits(['save']);
const handleEdit = () => {
  editing.value = true;
};

// 监听 record 变化，同步到 model
watch(
  () => record[dataIndex],
  (newValue: any) => {
    model[dataIndex] = newValue;
  },
  { immediate: true }
);

// 计算 switch 绑定的布尔值
const switchChecked = computed<boolean>({
  get() {
    return model[dataIndex] === 1 || model[dataIndex] === true;
  },
  set(val) {
    model[dataIndex] = val ? 1 : 0;
  }
});

async function handleSave() {
  editing.value = false;
  emit('save', record, model, column?.editable);
}
</script>

<template>
  <div v-if="column?.editable" class="editable-cell">
    <template v-if="column?.editable.name === 'textField'">
      <div v-if="alwaysEditing || editing">
        <AInput v-model:value="model[dataIndex]" @press-enter="handleSave()" @blur="handleSave()" />
      </div>
      <div
        v-else
        class="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
        @click="handleEdit()"
      >
        {{ text }}
      </div>
    </template>
    <template v-else-if="column?.editable.name === 'inputNumberField'">
      <div v-if="alwaysEditing || editing">
        <AInputNumber v-model:value="model[dataIndex]" @press-enter="handleSave()" @blur="handleSave()" />
      </div>
      <div
        v-else
        class="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
        @click="handleEdit()"
      >
        {{ text }}
      </div>
    </template>
    <template v-else-if="column?.editable.name === 'switchField'">
      <ASwitch
        v-model:checked="switchChecked"
        :checked-children="column?.editable.options[1]"
        :un-checked-children="column?.editable.options[0]"
        @change="handleSave()"
      />
    </template>
    <template v-else-if="column?.editable.name === 'selectField'">
      <ASelect v-model:value="model[dataIndex]" :options="column?.editable.options" @change="handleSave()" />
    </template>
    <template v-else>
      <div v-if="alwaysEditing || editing">
        <AInput v-model:value="model[dataIndex]" @press-enter="handleSave()" @blur="handleSave()" />
      </div>
      <div
        v-else
        class="cursor-pointer p-[5px] px-[12px] hover:min-h-[32px] hover:border hover:border-[#d9d9d9] hover:rounded-[2px] hover:p-[4px] hover:px-[11px]"
        @click="handleEdit()"
      >
        {{ text }}
      </div>
    </template>
  </div>
</template>
