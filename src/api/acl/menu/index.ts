import request from '@/utils/request'
import type { PermissionResponseData, MenuPermission } from './type'
//枚举接口
enum API {
  //获取菜单接口
  PERMISSIONLIST = '/admin/acl/permission',
  //添加权限模块
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  //更新权限
  UPDATE_URL = '/admin/acl/permission/update',
  //删除菜单权限
  REMOVEMENU = '/admin/acl/permission/remove/',
}

//获取菜单请求
export const reqGetPermission = () =>
  request.get<any, PermissionResponseData>(API.PERMISSIONLIST)

//添加或者更新权限接口
export const reqAddOrUpdatePermission = (permission: MenuPermission) => {
  if (permission.id) {
    return request.put<any, any>(API.UPDATE_URL, permission)
  } else {
    return request.post<any, any>(API.ADDPERMISSION_URL, permission)
  }
}
//移除菜单权限
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.REMOVEMENU + id)
