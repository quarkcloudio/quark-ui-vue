export function getLayoutInfoApi() {
  return useGet<any>(import.meta.env.VITE_APP_LAYOUT_URL)
}
