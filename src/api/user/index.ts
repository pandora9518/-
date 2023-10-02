//统一管理项目项目用户的接口
import request from '@/utils/request'
import type { loginResponseData, userInfoResponseData } from './type'
enum API {
  USER_LOGIN = '/admin/acl/index/login',
  USER_USERINFO = '/admin/acl/index/info',
  USER_LOGOUT = '/admin/acl/index/logout',
}
export const reqLogin = (data: any) => {
  return request.post<any, loginResponseData>(API.USER_LOGIN, data)
}
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USER_USERINFO)
}
export const reqLogout = () => {
  return request.post<any, any>(API.USER_LOGOUT)
}
