//这里是属性发送请求
import request from '@/utils/request'
import { CategoryResponseData, AttrResponseData, AttrResponse } from './type'
enum API {
  //一级分类
  C1_URL = '/admin/product/getCategory1',
  //二级分类
  C2_URL = '/admin/product/getCategory2/',
  //三级分类
  C3_URL = '/admin/product/getCategory3/',
  //商品基础属性接口
  ATTR_URL = '/admin/product/attrInfoList/',
  //商品属性更新和添加接口
  ADDORUPDATE = '/admin/product/saveAttrInfo',
  //商品属性删除接口
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}
//商品分类一级接口
export const reqGetCategory1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}
//商品分类二级接口
export const reqGetCategory2 = (id: number | string) => {
  return request.get<any, CategoryResponseData>(API.C2_URL + `${id}`)
}
//商品分类三级接口
export const reqGetCategory3 = (id: number | string) => {
  return request.get<any, CategoryResponseData>(API.C3_URL + `${id}`)
}
//商品基础属性接口
export const reqAttrValue = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
//商品属性添加和修改接口
export const reqAddOrUpdateAttr = (data: AttrResponse) =>
  request.post<any, any>(API.ADDORUPDATE, data)
//商品属性删除接口
export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + `${id}`)
