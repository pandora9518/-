export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//角色权限ts类型
export interface PermissionRole {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: ''
  type: number
  status: null
  level: number
  children?: PermissionList
  select: boolean
}
//菜单权限数组
export type PermissionList = PermissionRole[]

//分配权限ts类型
export interface PermissionResponseData extends ResponseData {
  data: PermissionList
}

//添加或者更新菜单ts类型
export interface MenuPermission {
  code: string
  id?: number
  level: number
  name: string
  pid: number
}
