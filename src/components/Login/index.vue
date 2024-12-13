<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { AxiosError } from 'axios'
import { loginApi } from '~/api/common/login'
import { getQueryParam } from '~/utils/tools'
import type { LoginMobileParams, LoginParams } from '~@/api/common/login'

const notification = useNotification()
const router = useRouter()
const token = useAuthorization()
const loginModel = reactive({
  username: undefined,
  password: undefined,
  mobile: undefined,
  code: undefined,
  type: 'account',
  remember: true,
})
const { t } = useI18nLocale()
const formRef = shallowRef()
const submitLoading = shallowRef(false)
const errorAlert = shallowRef(false)

async function submit() {
  submitLoading.value = true
  try {
    await formRef.value?.validate()
    let params: LoginParams | LoginMobileParams

    if (loginModel.type === 'account') {
      params = {
        username: loginModel.username,
        password: loginModel.password,
      } as unknown as LoginParams
    }
    else {
      params = {
        mobile: loginModel.mobile,
        code: loginModel.code,
        type: 'mobile',
      } as unknown as LoginMobileParams
    }
    const { data } = await loginApi(params)
    token.value = data?.token
    notification.success({
      message: '登录成功',
      description: '欢迎回来！',
      duration: 3,
    })
    // 获取当前是否存在重定向的链接，如果存在就走重定向的地址
    const redirect = getQueryParam('redirect', '/')
    router.push({
      path: redirect,
      replace: true,
    })
  }
  catch (e) {
    if (e instanceof AxiosError)
      errorAlert.value = true

    submitLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="ant-pro-form-login-container">
        <div class="ant-pro-form-login-top">
          <div class="ant-pro-form-login-header">
            <span class="ant-pro-form-login-logo">
              <img src="/logo.svg">
            </span>
            <span class="ant-pro-form-login-title">
              QuarkCloud
            </span>
          </div>
          <div class="ant-pro-form-login-desc">
            信息丰富的世界里，唯一稀缺的就是人类的注意力
          </div>
        </div>
        <div class="ant-pro-form-login-main" w-335px>
          <a-form ref="formRef">
            <a-form-item name="username" :rules="[{ required: true, message: t('pages.login.username.required') }]">
              <a-input v-model:value="loginModel.username" allow-clear :placeholder="t('pages.login.username.placeholder')" size="large" @press-enter="submit">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: t('pages.login.password.required') }]">
              <a-input-password v-model:value="loginModel.password" allow-clear :placeholder="t('pages.login.password.placeholder')" size="large" @press-enter="submit">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <a-button type="primary" block :loading="submitLoading" size="large" @click="submit">
              {{ t('pages.login.submit') }}
            </a-button>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: var(--bg-color-container);
}
.login-content{
  flex: 1 1;
  padding: 84px 0
}
.ant-pro-form-login-container{
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  padding: 32px 0;
  overflow: auto;
  background: inherit
}
.ant-pro-form-login-top {
  text-align: center
}
.ant-pro-form-login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  line-height: 44px
}
.ant-pro-form-login-header a {
  text-decoration: none
}
.ant-pro-form-login-title {
  position: relative;
  top: 2px;
  color: var(--text-color);
  font-weight: 600;
  font-size: 33px
}
.ant-pro-form-login-logo {
  width: 44px;
  height: 44px;
  margin-right: 16px;
  vertical-align: top
}
.ant-pro-form-login-logo img {
  width: 100%
}
.ant-pro-form-login-desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: var(--text-color-1);
  font-size: 14px
}
.ant-pro-form-login-main {
  min-width: 328px;
  max-width: 500px;
  margin: 0 auto;
  .ant-pro-form-login-other {
    margin-top: 24px;
    line-height: 22px;
    text-align: left
  }
  .icon{
    margin-left: 8px;
    color: var(--text-color-2);
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    transition: color .3s;
    &:hover{
      color: var(--pro-ant-color-primary);
    }
  }
}
@media(min-width: 768px){
  .login-container{
    background-image:url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }
  .login-content{
    padding: 84px 0 24px;
  }
  .ant-pro-form-login-container{
    padding:32px 0 24px;
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%
  }
}
</style>
