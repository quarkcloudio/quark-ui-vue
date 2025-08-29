import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';

export const useFormStore = defineStore(SetupStoreId.Form, () => {
  const submitLoading = ref(false);

  const setSubmitLoading = (loading: boolean) => {
    submitLoading.value = loading;
  };

  const resetLoading = () => {
    submitLoading.value = false;
  };
  const resetStore = () => {
    submitLoading.value = false;
  };

  return {
    submitLoading,
    setSubmitLoading,
    resetLoading,
    resetStore
  };
});
