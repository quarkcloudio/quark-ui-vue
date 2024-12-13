<script setup lang="ts">
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons-vue'

const props = withDefaults(defineProps<{
  logo?: any
  title?: string
  subTitle?: string
}>(), {
  logo: '/logo.png',
  title: 'QuarkCloud',
  subTitle: '信息丰富的世界里，唯一稀缺的就是人类的注意力',
})

const { logo, title } = toRefs(props)
</script>

<template>
  <div class="ant-pro-form-login-page">
    <div class="ant-pro-form-login-page-notice" />
    <div class="ant-pro-form-login-page-left">
      <div class="ant-pro-form-login-page-container">
        <div class="ant-pro-form-login-page-top">
          <div class="ant-pro-form-login-page-header">
            <span class="ant-pro-form-login-page-logo">
              <img :src="logo" alt="logo">
            </span>
            <span class="ant-pro-form-login-page-title">{{ title }}</span>
          </div>
          <div class="ant-pro-form-login-page-desc">
            {{ subTitle }}
          </div>
        </div>
        <div class="ant-pro-form-login-page-main">
          <a-divider class="mt--15px mb-15px" />
          <a-form
            name="basic"
            autocomplete="off"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名' }]"
            >
              <a-input size="large" placeholder="用户名" allow-clear>
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password size="large" placeholder="密码">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item
              name="captcha"
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <a-input size="large" placeholder=" 验证码">
                <template #prefix>
                  <SafetyCertificateOutlined />
                </template>
                <template #addonAfter>
                  <img style="width: 110px; cursor: pointer;" src="/api/admin/login/index/captcha/7DJBGlVBFDP73JWp1rFQ?t=1731735829731">
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button block size="large" type="primary" html-type="submit">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ant-pro-form-login-page {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: var(--bg-color-container);
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.ant-pro-form-login-page-notice {
  display: flex;
  flex: 1;
  z-index: 99;
  align-items: flex-end;
}
.ant-pro-form-login-page-left {
  display: flex;
  flex: 1;
  z-index: 99;
  flex-direction: column;
  max-width: 550px;
  padding-inline: 0;
  padding-block: 32px;
  overflow: auto;
  align-items: center;
  justify-content: center;
  padding: 24px;
  height: max-content;
  margin: auto;
}
@media (min-width: 768px) {
  .ant-pro-form-login-page-left {
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }
}
.ant-pro-form-login-page-container {
  border-radius: 6px;
    background-size: 100%;
    background-position: top;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
    background-image: radial-gradient(circle at 93% 1e+02%, rgba(22, 119, 255, 0.17) 0%, rgba(255, 255, 255, 0.05) 23%, rgba(255, 255, 255, 0.03) 87%, rgba(22, 119, 255, 0.12) 109%);
    padding: 32px;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.1);
}
.ant-pro-form-login-page-top {
  text-align: center;
}
.ant-pro-form-login-page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  line-height: 44px;
}
.ant-pro-form-login-page-logo {
  width: 44px;
  height: 44px;
  margin-inline-end: 16px;
  vertical-align: top;
}
.ant-pro-form-login-page-logo img {
  width: 100%;
}
.ant-pro-form-login-page-title {
  position: relative;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 33px;
}
.ant-pro-form-login-page-desc {
  margin-block-start: 12px;
  margin-block-end: 40px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
.ant-pro-form-login-page-main {
  width: 328px;
  margin: 0 auto;
}
</style>
