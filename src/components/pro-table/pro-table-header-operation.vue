<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'ProTableHeaderOperation'
});

interface Props {
  loading?: boolean;
}

defineProps<Props>();

interface Emits {
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<AntDesign.TableColumnCheck[]>('columns', {
  default: () => []
});

function refresh() {
  emit('refresh');
}
</script>

<template>
  <div class="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
    <AButton size="small" @click="refresh">
      <template #icon>
        <icon-ant-design:reload-outlined class="align-sub text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      <span class="ml-8px">{{ $t('common.refresh') }}</span>
    </AButton>
    <ProTableColumnSetting v-model:columns="columns" />
  </div>
</template>

<style scoped></style>
