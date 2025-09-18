import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';

export const useEngineStore = defineStore(SetupStoreId.Engine, () => {
  const engineApi = ref('');
  const engineComponent = reactive({});

  const setEngineApi = (api: string) => {
    engineApi.value = api;
  };

  const setEngineComponent = (component: Api.Engine.EngineComponent | null) => {
    Object.assign(engineComponent, component);
  };

  const resetStore = () => {
    engineApi.value = '';
  };

  return {
    engineApi,
    engineComponent,
    setEngineApi,
    setEngineComponent,
    resetStore
  };
});
