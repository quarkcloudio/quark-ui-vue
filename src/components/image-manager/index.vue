<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { UploadOutlined, createFromIconfontCN } from '@ant-design/icons-vue';
import { fetchImageBatchDelete, fetchImageCrop, fetchImageDelete, fetchImageList } from '@/service/api';
import { localStg } from '@/utils/storage';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
});

// 定义组件属性
interface ImageManagerProps {
  cropAction?: string;
  cropButtonText?: string;
  deleteAction?: string;
  deleteButtonText?: string;
  listAction?: string;
  namePlaceholder?: string;
  onCancel?: (e: any) => void;
  onOk?: (value: any) => void;
  open?: boolean;
  patchDeleteAction?: string;
  popconfirmCancelText?: string;
  popconfirmOkText?: string;
  popconfirmTitle?: string;
  searchButtonText?: string;
  selectedAllButtonText?: string;
  selectedButtonText?: string;
  title?: string;
  uploadAction?: string;
  uploadButtonText?: string;
  width?: number;
}

const props = withDefaults(defineProps<ImageManagerProps>(), {
  cropAction: '/api/admin/upload/image/crop',
  cropButtonText: '裁剪',
  deleteAction: '/api/admin/upload/image/delete',
  deleteButtonText: '删除',
  listAction: '/api/admin/upload/image/getList',
  namePlaceholder: '文件名称',
  open: false,
  patchDeleteAction: '/api/admin/upload/image/delete',
  popconfirmCancelText: '取消',
  popconfirmOkText: '确定',
  popconfirmTitle: '确认要删除吗？',
  searchButtonText: '搜索',
  selectedAllButtonText: '全选',
  selectedButtonText: '选择',
  uploadAction: '/api/admin/upload/image/handle',
  uploadButtonText: '上传图片',
  width: 1100
});

const emit = defineEmits<{
  (e: 'cancel', event: any): void;
  (e: 'ok', value: any): void;
}>();

// 响应式数据
const isModalOpen = ref(props.open);
const isCropBoxModalOpen = ref(false);
const cropImageSrc = ref('');
const categoryId = ref('');
const selectedKeys = ref(['0']);

const dataSource = reactive({
  categorys: [] as any[],
  list: [] as any[],
  pagination: {
    current: 1,
    defaultCurrent: 1,
    pageSize: 10,
    total: undefined as number | undefined
  }
});

const searchForm = reactive({
  createtime: [] as any,
  name: ''
});

const checkedForm = reactive({
  checkedItems: [] as any[]
});

// 计算属性
const menuItems = computed(() => {
  return dataSource.categorys.map((item: any) => ({
    key: item.id,
    label: item.title
  }));
});

const uploadHeaders = computed(() => {
  return {
    authorization: `Bearer ${localStg.get('token')}`
  };
});

// 方法定义
const getList = async (page: any = 1, search: any = null) => {
  const result: any = await fetchImageList(props.listAction || '', {
    categoryId: categoryId.value,
    page,
    ...search
  });
  Object.assign(dataSource, result.data);
};

const onSearch = (values: any) => {
  if (values?.createtime) {
    values.createtime = [
      values?.createtime?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      values?.createtime?.[1]?.format('YYYY-MM-DD HH:mm:ss')
    ];
  }
  getList(1, values);
};

const onSelectAll = () => {
  const data: any[] = [];
  dataSource.list.forEach((item: any) => {
    data.push(item.id);
  });

  if (checkedForm.checkedItems && checkedForm.checkedItems.length === dataSource.list.length) {
    checkedForm.checkedItems = [];
  } else {
    checkedForm.checkedItems = data;
  }
};

const toggleChecked = (id: any) => {
  const pos = checkedForm.checkedItems.indexOf(id);
  if (pos < 0) {
    checkedForm.checkedItems.push(id);
  } else {
    checkedForm.checkedItems.splice(pos, 1);
  }
};

const onDelete = async (id: any = null) => {
  await fetchImageDelete(props.deleteAction || '', { id });
  getList();
};

const onPatchDelete = async () => {
  await fetchImageBatchDelete(props.patchDeleteAction || '', {
    id: checkedForm.checkedItems
  });
  getList();
};

const onMenuClick = ({ key }: any) => {
  // 重置搜索表单
  Object.assign(searchForm, {
    createtime: [],
    name: ''
  });
  categoryId.value = key;
  getList();
};

const onUploadChange = () => {
  getList();
};

const onPageChange = (page: number) => {
  getList(page);
};

const handleOk = () => {
  const items: any[] = [];
  checkedForm.checkedItems.forEach((item: any) => {
    dataSource.list.forEach((dataItem: any) => {
      if (dataItem.id === item) {
        delete dataItem.type;
        items.push(dataItem);
      }
    });
  });
  emit('ok', items);
};

const openCropModal = (item: any) => {
  const imageUrl = `${item.url}?timestamp${new Date().getTime()}`;
  isCropBoxModalOpen.value = true;
  cropImageSrc.value = imageUrl;
};

const closeCropModal = () => {
  isCropBoxModalOpen.value = false;
};

const handleCropOk = async (value: any) => {
  // 找到当前裁剪的图片项
  const currentItem = dataSource.list.find((item: any) => cropImageSrc.value.includes(item.url));

  if (currentItem) {
    await fetchImageCrop(props.cropAction || '', {
      data: {
        file: value,
        id: currentItem.id
      },
      url: props.cropAction
    });
    isCropBoxModalOpen.value = false;
    getList();
  }
};

// 监听器
watch(
  () => props.open,
  newVal => {
    isModalOpen.value = newVal;
    if (newVal) {
      // 重置表单
      Object.assign(searchForm, {
        createtime: [],
        name: ''
      });
      checkedForm.checkedItems = [];
      getList();
    }
  }
);

// 组件挂载时初始化
onMounted(() => {
  if (props.open) {
    getList();
  }
});
</script>

<template>
  <AModal :open="isModalOpen" :title="title" :width="width" @cancel="onCancel" @ok="handleOk">
    <ARow :gutter="20" style="margin-top: 30px">
      <ACol v-if="menuItems.length > 0" :span="4">
        <AConfigProvider prefix-cls="editor-menu">
          <AMenu
            v-model:selected-keys="selectedKeys"
            :items="menuItems"
            mode="inline"
            style="width: 100%"
            @click="onMenuClick"
          />
        </AConfigProvider>
      </ACol>

      <ACol :span="menuItems.length > 0 ? 20 : 24">
        <ARow :gutter="16">
          <ACol :span="24">
            <AForm ref="searchFormRef" :model="searchForm" layout="inline" style="float: left" @finish="onSearch">
              <AFormItem>
                <AButton @click="onSelectAll">{{ selectedAllButtonText }}</AButton>
              </AFormItem>
              <AFormItem name="createtime">
                <ARangePicker v-model:value="searchForm.createtime" />
              </AFormItem>
              <AFormItem name="name">
                <AInput v-model:value="searchForm.name" :placeholder="namePlaceholder" />
              </AFormItem>
              <AFormItem>
                <AButton html-type="submit" type="primary">{{ searchButtonText }}</AButton>
              </AFormItem>
            </AForm>

            <ASpace style="float: right">
              <APopconfirm
                :cancel-text="popconfirmCancelText"
                :ok-text="popconfirmOkText"
                :title="popconfirmTitle"
                @confirm="onPatchDelete"
              >
                <AButton danger type="primary">{{ deleteButtonText }}</AButton>
              </APopconfirm>

              <AUpload
                :action="uploadAction"
                :multiple="true"
                :show-upload-list="false"
                :headers="uploadHeaders"
                @change="onUploadChange"
              >
                <AButton>
                  <UploadOutlined />
                  {{ uploadButtonText }}
                </AButton>
              </AUpload>
            </ASpace>
          </ACol>
        </ARow>

        <ADivider />

        <AForm ref="checkedFormRef" :model="checkedForm" style="width: 100%">
          <AFormItem name="checkedItems" style="width: 100%">
            <ACheckboxGroup v-model:value="checkedForm.checkedItems" style="display: block; width: 100%">
              <ARow :gutter="[16, 16]">
                <ACol v-for="(item, index) in dataSource.list" :key="index" :span="6">
                  <ACard hoverable size="small" style="width: 100%" :actions="['', '', '']">
                    <template #cover>
                      <img
                        :alt="item.name"
                        height="120"
                        :src="item.url"
                        style="object-fit: cover; width: 100%"
                        @click="toggleChecked(item.id)"
                      />
                    </template>

                    <template #actions>
                      <ACheckbox :value="item.id">{{ selectedButtonText }}</ACheckbox>

                      <div @click="openCropModal(item)">
                        <IconFont type="icon-edit" />
                        {{ cropButtonText }}
                      </div>

                      <APopconfirm
                        :cancel-text="popconfirmCancelText"
                        :ok-text="popconfirmOkText"
                        :title="popconfirmTitle"
                        @confirm="onDelete(item.id)"
                      >
                        <IconFont type="icon-delete" />
                        {{ deleteButtonText }}
                      </APopconfirm>
                    </template>

                    <ACardMeta :title="item.name" />
                  </ACard>
                </ACol>
              </ARow>
            </ACheckboxGroup>
          </AFormItem>
        </AForm>

        <ADivider />

        <ARow v-if="dataSource">
          <ACol :span="24">
            <APagination
              v-model:current="dataSource.pagination.current"
              :default-current="dataSource.pagination.defaultCurrent"
              :page-size="dataSource.pagination.pageSize"
              :total="dataSource.pagination.total"
              style="float: right; margin: 0 auto"
              @change="onPageChange"
            />
          </ACol>
        </ARow>
      </ACol>
    </ARow>

    <!-- 裁剪弹窗 -->
    <Cropper :open="isCropBoxModalOpen" :src="cropImageSrc" @cancel="closeCropModal" @ok="handleCropOk" />
  </AModal>
</template>
