<script setup>
import { computed, defineProps, ref } from 'vue';
import { Upload as AUpload, message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { fetchCropperData } from '@/service/api';
import { localStg } from '@/utils/storage';

defineOptions({
  name: 'ProFormImage'
});

const props = defineProps({
  button: { type: String, default: '上传图片' },
  action: { type: String, default: '/api/admin/upload/image/handle' },
  cropAction: { type: String, default: '/api/admin/upload/image/crop' },
  limitType: { type: Array, default: () => [] },
  limitSize: { type: Number, required: true },
  limitNum: { type: Number, required: true },
  limitWH: { type: Object, default: () => ({ width: null, height: null }) },
  mode: { type: String, required: true },
  value: { type: any, default: [] },
  disabled: { type: Boolean, default: false },
  typeErrorMsg: { type: String, required: true },
  sizeErrorMsg: { type: String, required: true },
  onChange: { type: Function, default: null }
});

const getFileList = ref([]);
const isModalOpen = ref(false);
const imgSrc = ref('');
const imgId = ref('');
const headers = {
  authorization: `Bearer ${localStg.get('token')}`
};

const uploadAction = computed(() => {
  if (props.limitWH.width && props.limitWH.height) {
    return `${props.action}?limitW=${props.limitWH.width}&limitH=${props.limitWH.height}`;
  } else if (props.limitWH.width) {
    return `${props.action}?limitW=${props.limitWH.width}`;
  } else if (props.limitWH.height) {
    return `${props.action}?limitH=${props.limitWH.height}`;
  }
  return props.action;
});

const checkUpload = file => {
  let canUpload = false;

  // 使用 for...of 替代 for 循环 with ++
  for (const type of props.limitType) {
    if (file.type.includes(type)) {
      canUpload = true;
      break; // 找到匹配项后提前退出循环
    }
  }

  if (!canUpload) {
    message.error(props.typeErrorMsg);
    return false;
  }

  const isLtSize = file.size / 1024 / 1024 < props.limitSize;
  if (!isLtSize) {
    message.error(`${props.sizeErrorMsg + props.limitSize}MB!`);
    return false;
  }

  return true;
};

const triggerChange = changedValue => {
  if (props.onChange) {
    props.onChange(changedValue);
  }
};

const onFileInfoChange = ({ file }) => {
  if (file.status === 'done') {
    if (file.response?.type === 'success') {
      triggerChange(file.response.data);
    } else {
      message.error(file.response?.content);
    }
  }
};

const onFileListChange = ({ fileList }) => {
  // 创建新数组而不是修改原参数
  let newFileList = [...fileList].slice(-props.limitNum);

  newFileList = newFileList.filter(file => {
    if (file.response) {
      return file.response.type === 'success';
    }
    if (file.status) {
      return true;
    }
    return false;
  });

  newFileList = newFileList.map(file => {
    if (file.response) {
      return {
        ...file,
        id: file.response.data.id,
        name: file.response.data.name,
        url: file.response.data.url,
        size: file.response.data.size
      };
    }
    return file;
  });

  triggerChange(newFileList);
};

const handlePreview = file => {
  isModalOpen.value = true;
  imgSrc.value = `${file.url}?timestamp=${new Date().getTime()}`;
  imgId.value = file.id;
};

const onCrop = async value => {
  const result = await fetchCropperData(props.cropAction, { id: imgId.value, file: value });

  if (result.type === 'success') {
    message.success(result.content);
    isModalOpen.value = false;
  } else {
    message.error(result.content, 3);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div>
    <AUpload
      v-if="mode === 'single'"
      name="file"
      list-type="picture-card"
      show-upload-list="false"
      :action="uploadAction"
      :disabled="disabled"
      :headers="headers"
      :before-upload="checkUpload"
      @change="onFileInfoChange"
    >
      <template v-if="value">
        <img
          v-if="typeof value === 'string'"
          :src="value"
          style="width: 100%; height: 100%; object-fit: contain; padding: 8px"
        />
        <img
          v-else
          :src="value.url"
          :alt="value.name"
          style="width: 100%; height: 100%; object-fit: contain; padding: 8px"
        />
      </template>
      <template v-else>
        <div>
          <AIcon :component="PlusOutlined" />
          <div>{{ button }}</div>
        </div>
      </template>
    </AUpload>

    <AUpload
      v-else
      name="file"
      :file-list="getFileList || value"
      multiple
      list-type="picture-card"
      :action="uploadAction"
      :disabled="disabled"
      :headers="headers"
      :before-upload="checkUpload"
      @preview="handlePreview"
      @change="onFileListChange"
    >
      <template v-if="!disabled || !value || !value.length">
        <div>
          <AIcon :component="PlusOutlined" />
          <div>{{ button }}</div>
        </div>
      </template>
    </AUpload>

    <Cropper :open="isModalOpen" :src="imgSrc" @ok="onCrop" @cancel="closeModal" />
  </div>
</template>

<style scoped></style>
