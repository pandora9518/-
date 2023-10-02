export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//用户职位ts类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
export type Records = RoleData[]
//角色数据ts类型
export interface RoleDataResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    pages: number
  }
}
//角色菜单ts类型
export interface MenuRole {
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
  children: MenuList
  select: boolean
}
//菜单权限数组
export type MenuList = MenuRole[]

//分配权限ts类型
export interface MenuRoleResponseData extends ResponseData {
  data: MenuList
}
