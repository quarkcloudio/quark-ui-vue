<script setup>
import Editor from '@tinymce/tinymce-vue';
defineOptions({
  name: 'ProFormEditor'
});
</script>

<template>
  <main id="editor">
    <Editor
      id="uuid"
      license-key="gpl"
      :init="{
        language: 'zh_CN',
        promotion: false,
        branding: false,
        plugins:
          'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        height: 500
      }"
    />
  </main>
</template>

<style scoped></style>
