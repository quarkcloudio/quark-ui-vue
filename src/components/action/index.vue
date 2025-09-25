<script setup lang="ts">
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Action'
});

interface Props {
  actionType?: string;
  loading?: boolean;
  label?: string;
  icon?: string;
  size?: 'small' | 'middle' | 'large';
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  ghost?: boolean;
  block?: boolean;
  danger?: boolean;
  shape?: 'circle' | 'round';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  data?: Record<string, any>;
}

const { actionType, size, type, disabled, ghost, block, danger, shape, htmlType, href, target, onClick, data } =
  defineProps<Props>();
</script>

<template>
  <div v-if="actionType === 'back'">
    <Back
      :label="label"
      :icon="icon"
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
      :data="data"
    />
  </div>
  <div v-else-if="actionType === 'link'">
    <AButton
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
      :href="tplEngine(href, { ...data, enginePath: $route?.fullPath })"
      :target="target"
    >
      <template v-if="icon" #icon>
        <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
      </template>
      <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
      <template v-else>{{ tplEngine(label, data) }}</template>
    </AButton>
  </div>
  <div v-else-if="actionType === 'modal'">
    <Modal
      :label="label"
      :icon="icon"
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
      :data="data"
    />
  </div>
  <div v-else-if="actionType === 'drawer'">
    <Drawer
      :label="label"
      :icon="icon"
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
      :data="data"
    />
  </div>
  <div v-else>
    <AButton
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
      :html-type="htmlType"
      @click="onClick"
    >
      <template v-if="icon" #icon>
        <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
      </template>
      <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
      <template v-else>{{ tplEngine(label, data) }}</template>
    </AButton>
  </div>
</template>

<style scoped></style>
