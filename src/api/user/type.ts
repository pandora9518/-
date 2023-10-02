//登录接口传递的参数类型
export interface loginFormData {
  password: string
  username: string
}
//所有接口返回的数据类型
interface userResponseData {
  code: number
  message: string
  ok: boolean
}
//定义登录接口所返回的数据类型
export interface loginResponseData extends userResponseData {
  data: string
}
//定义获取信息接口返回的数据类型
export interface userInfoResponseData extends userResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
