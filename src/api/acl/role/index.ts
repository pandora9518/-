import request from '@/utils/request'
import type {
  RoleDataResponseData,
  RoleData,
  MenuRoleResponseData,
} from './type'
//枚举接口
enum API {
  //获取角色数据
  ALLROLE = '/admin/acl/role/',
  //添加角色职位
  ADDROLE = '/admin/acl/role/save',
  //更新角色职位
  UPDATEROLE = '/admin/acl/role/update',
  //获取角色菜单接口
  ALLPERMISSION = '/admin/acl/permission/toAssign/',
  //修改角色权限
  SETPERMISSION = '/admin/acl/permission/doAssign',
  //删除职位
  REMOBEROLE = '/admin/acl/permission/remove/',
}
//发请求获取角色数据
export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleDataResponseData>(
    API.ALLROLE + `${page}/${limit}/?roleName=${roleName}`,
  )
//更新或者修改角色数据
export const reqAddOrUpdateRole = (role: RoleData) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATEROLE, role)
  } else {
    return request.post<any, any>(API.ADDROLE, role)
  }
}

//获取角色权限菜单
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuRoleResponseData>(API.ALLPERMISSION + roleId)
//修改角色权限接口
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION + `/?roleId=${roleId} & permissionId=${permissionId}`,
  )

//删除职位
export const reqRemoveRole = (id: number) =>
  request.delete<any, any>(API.REMOBEROLE + id)
