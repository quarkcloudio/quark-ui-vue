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
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'preview',
          'help',
          'wordcount'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        height: 500
      }"
    />
  </main>
</template>

<style scoped></style>
