import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  RoleVo,
} from './type'
//这里是用户管理接口
enum API {
  //获取所有用户接口
  USERINFO_URL = '/admin/acl/user/',
  //添加新的用户
  ADDUSER_URL = '/admin/acl/user/save',
  //修改已经存在的用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  //获取用户职位接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  //给用户分配角色
  ASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个用户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量删除用户
  REMOVEALLUSER_URL = '/admin/acl/user/batchRemove',
}
//用户管理接口
export const reqUserList = (page: number, limit: number, username: string) => {
  return request.get<any, UserResponseData>(
    API.USERINFO_URL + `${page}/${limit}/?username=${username}`,
  )
}

//添加或者修改用户接口
export const reqAddOrUpdateUser = (user: User) => {
  if (user.id) {
    return request.put(API.UPDATEUSER_URL, user)
  } else {
    console.log(123)
    return request.post(API.ADDUSER_URL, user)
  }
}
//获取用户职位接口
export const reqAllRole = (adminId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + adminId)
//给用户分配角色
export const reqAssignRole = (roleVo: RoleVo) =>
  request.post<any, any>(API.ASSIGNROLE_URL, roleVo)
//删除某个用户
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + id)
//批量删除用户
export const reqRemoveUser = (idList: number[]) =>
  request.delete<any, any>(API.REMOVEALLUSER_URL, { data: idList })
