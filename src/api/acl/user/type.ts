export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//用户的ts类型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
//用户数组的ts类型
export type Records = User[]
//用户数据的返回类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

//用户职位ts类型
export interface RoleData {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
//用户职位数组
export type AllRole = RoleData[]

//用户职位数据ts类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}
//给用户分配角色ts属性
export interface RoleVo {
  roleIdList: number[]
  userId: number
}
