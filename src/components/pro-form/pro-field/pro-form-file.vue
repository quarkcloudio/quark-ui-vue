<script setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { localStg } from '@/utils/storage';

defineOptions({
  name: 'ProFormFile'
});

const props = defineProps({
  action: String,
  button: String,
  limitNum: Number,
  limitSize: Number,
  limitType: Array,
  onChange: Function,
  value: {
    type: Array,
    default: () => []
  }
});

const getFileList = ref([]);
const uploadIcon = ref(UploadOutlined);

const triggerChange = changedValue => {
  if (props.onChange) {
    props.onChange(changedValue);
  }
};

const onFileListChange = info => {
  let fileList = info.fileList;

  // 限制上传数量
  fileList = fileList.slice(-props.limitNum);

  // 只保存上传成功的数据
  fileList = fileList.filter(file => {
    if (file.response) {
      return file.response.type === 'success';
    }
    return file.status === 'done';
  });

  // 重组数据
  fileList = fileList.map(file => {
    if (file.response) {
      file.id = file.response.data.id;
      file.name = file.response.data.name;
      file.url = file.response.data.url;
      file.size = file.response.data.size;
    }
    return file;
  });

  getFileList.value = fileList;
  triggerChange(fileList);
};

const checkUpload = file => {
  let canUpload = false;

  console.log('当前文件类型：', file.type);
  for (const type of props.limitType) {
    if (file.type.includes(type)) {
      canUpload = true;
      break; // 找到匹配项后提前退出循环
    }
  }

  if (!canUpload) {
    message.error('请上传正确格式的文件!');
    return false;
  }

  const isLtSize = file.size / 1024 / 1024 < props.limitSize;
  if (!isLtSize) {
    message.error(`文件大小不可超过${props.limitSize}MB!`);
    return false;
  }

  return true;
};

const uploadHeaders = {
  authorization: `Bearer ${localStg.get('token')}`
};
</script>

<template>
  <AUpload
    :action="action"
    :file-list="getFileList || value"
    :multiple="true"
    name="file"
    :before-upload="checkUpload"
    :headers="uploadHeaders"
    @change="onFileListChange"
  >
    <AButton :icon="uploadIcon">{{ button }}</AButton>
  </AUpload>
</template>

<style scoped>
/* Custom styles */
</style>
