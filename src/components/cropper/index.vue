<script setup>
import { defineProps, ref, watch } from 'vue';
import VueCropper from 'vue-cropperjs';
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  DragOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SelectOutlined
} from '@ant-design/icons-vue';

import 'cropperjs/dist/cropper.css';

const props = defineProps({
  title: String,
  width: { type: Number, default: 980 },
  height: { type: Number, default: 400 },
  src: String,
  open: { type: Boolean, default: false },
  initialAspectRatio: { type: Number, default: 16 / 9 },
  moveButtonText: { type: String, default: '画布' },
  cropBoxButtonText: { type: String, default: '裁剪框' },
  zoomInButtonText: { type: String, default: '放大' },
  zoomOutButtonText: { type: String, default: '放小' },
  rotateLeftButtonText: { type: String, default: '左旋' },
  rotateRightButtonText: { type: String, default: '右旋' },
  aspectAutoButtonText: { type: String, default: '自由' },
  resetButtonText: { type: String, default: '重置' },
  cropButtonText: { type: String, default: '裁剪' },
  onOk: Function,
  onCancel: Function
});

const isModalOpen = ref(props.open);
const imgSrc = ref(props.src);
const cropperRef = ref(null);
const cropper = ref(null);
const scaleX = ref(1);
const scaleY = ref(1);

watch(
  () => props.open,
  newVal => {
    isModalOpen.value = newVal;
    scaleX.value = 1;
    scaleY.value = 1;
  }
);

watch(
  () => props.src,
  newVal => {
    imgSrc.value = newVal;
    scaleX.value = 1;
    scaleY.value = 1;
  }
);

const setCropper = cropperInstance => {
  cropper.value = cropperInstance;
};

const setDragMode = mode => {
  cropper.value.setDragMode(mode);
};

const zoom = value => {
  cropper.value.zoom(value);
};

const rotate = degree => {
  cropper.value.rotate(degree);
};

const move = (x, y) => {
  cropper.value.move(x, y);
};

const scaleXToggle = () => {
  if (scaleX.value === 1) {
    cropper.value.scaleX(-1);
    scaleX.value = -1;
  } else {
    cropper.value.scaleX(1);
    scaleX.value = 1;
  }
};

const scaleYToggle = () => {
  if (scaleY.value === 1) {
    cropper.value.scaleY(-1);
    scaleY.value = -1;
  } else {
    cropper.value.scaleY(1);
    scaleY.value = 1;
  }
};

const setAspectRatio = aspectRatio => {
  cropper.value.setAspectRatio(aspectRatio);
};

const reset = () => {
  cropper.value.reset();
};

const onCrop = () => {
  const croppedData = cropper.value.getCroppedCanvas().toDataURL();
  props.onOk?.(croppedData);
};

const handleCancel = e => {
  props.onCancel?.(e);
};

const dragIcon = DragOutlined;
const selectIcon = SelectOutlined;
const zoomInIcon = PlusCircleOutlined;
const zoomOutIcon = MinusCircleOutlined;
const rotateLeftIcon = RotateLeftOutlined;
const rotateRightIcon = RotateRightOutlined;
</script>

<template>
  <AModal :title="title" :visible="isModalOpen" :width="width" footer="{null}" @cancel="handleCancel">
    <VueCropper
      ref="cropperRef"
      :src="imgSrc"
      :style="{ height: height + 'px', width: '100%' }"
      :initial-aspect-ratio="initialAspectRatio"
      @initialized="setCropper"
    />
    <ARow gutter="20" style="margin-top: 20px">
      <ACol span="24">
        <ASpace>
          <AInputGroup compact>
            <AButton :icon="dragIcon" size="small" @click="setDragMode('move')">
              {{ moveButtonText }}
            </AButton>
            <AButton :icon="selectIcon" size="small" @click="setDragMode('crop')">
              {{ cropBoxButtonText }}
            </AButton>
          </AInputGroup>
          <AInputGroup compact>
            <AButton :icon="zoomInIcon" size="small" @click="zoom(0.1)">
              {{ zoomInButtonText }}
            </AButton>
            <AButton :icon="zoomOutIcon" size="small" @click="zoom(-0.1)">
              {{ zoomOutButtonText }}
            </AButton>
          </AInputGroup>
          <AInputGroup compact>
            <AButton :icon="rotateLeftIcon" size="small" @click="rotate(45)">
              {{ rotateLeftButtonText }}
            </AButton>
            <AButton :icon="rotateRightIcon" size="small" @click="rotate(-45)">
              {{ rotateRightButtonText }}
            </AButton>
          </AInputGroup>
          <AInputGroup compact>
            <AButton size="small" @click="move(-10, 0)">
              <ArrowLeftOutlined />
            </AButton>
            <AButton size="small" @click="move(10, 0)">
              <ArrowRightOutlined />
            </AButton>
            <AButton size="small" @click="move(0, -10)">
              <ArrowUpOutlined />
            </AButton>
            <AButton size="small" @click="move(0, 10)">
              <ArrowDownOutlined />
            </AButton>
          </AInputGroup>
          <AInputGroup compact>
            <AButton size="small" @click="scaleXToggle">
              <ColumnWidthOutlined />
            </AButton>
            <AButton size="small" @click="scaleYToggle">
              <ColumnHeightOutlined />
            </AButton>
          </AInputGroup>
          <AInputGroup compact>
            <AButton size="small" @click="setAspectRatio(16 / 9)">16:9</AButton>
            <AButton size="small" @click="setAspectRatio(4 / 3)">4:3</AButton>
            <AButton size="small" @click="setAspectRatio(1 / 1)">1:1</AButton>
            <AButton size="small" @click="setAspectRatio(2 / 3)">2:3</AButton>
            <AButton size="small" @click="setAspectRatio(NaN)">
              {{ aspectAutoButtonText }}
            </AButton>
          </AInputGroup>
          <AButton size="small" @click="reset">
            {{ resetButtonText }}
          </AButton>
          <AButton size="small" type="primary" @click="onCrop">
            {{ cropButtonText }}
          </AButton>
        </ASpace>
      </ACol>
    </ARow>
  </AModal>
</template>

<style scoped>
/* Custom styles */
</style>
