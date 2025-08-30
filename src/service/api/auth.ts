import { request } from '../request';

/**
 * Get login component
 *
 * @param api Login component api
 */
export function fetchAuthComponent(api?: string) {
  return request<Api.Auth.AuthComponent>({ url: api || '/api/admin/auth/index/index' });
}

/** Get login captcha */
export function fetchLoginCaptcha(api: string) {
  return request<Api.Auth.LoginCaptcha>({ url: api });
}

/**
 * Login
 *
 * @param params params
 */
export function fetchLogin(api: string, params: any) {
  return request<Api.Auth.LoginToken>({
    url: api,
    method: 'post',
    data: params
  });
}

/** Get user info */
export function fetchUserInfo(api: string) {
  return request<Api.Auth.UserInfo>({ url: api });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
