import { reactive } from 'vue';

const globalEngine = reactive<Record<string, any>>({});

export function useEngine() {
  const setEngineApi = (value: any) => {
    globalEngine.engineApi = value;
  };

  const getEngineApi = () => {
    return globalEngine.engineApi;
  };

  const setEngineComponent = (value: any) => {
    globalEngine.engineComponent = value;
  };

  const getEngineComponent = () => {
    return globalEngine.engineComponent;
  };

  const setEngineFormApi = (value: any) => {
    globalEngine.engineFormApi = value;
  };

  const getEngineFormApi = () => {
    return globalEngine.engineFormApi;
  };

  const setEngineFormRef = (value: any) => {
    globalEngine.engineFormRef = value;
  };

  const getEngineFormRef = () => {
    return globalEngine.engineFormRef;
  };

  return {
    globalEngine,
    setEngineApi,
    getEngineApi,
    setEngineComponent,
    getEngineComponent,
    setEngineFormApi,
    getEngineFormApi,
    setEngineFormRef,
    getEngineFormRef
  };
}
