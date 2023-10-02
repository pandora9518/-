//这里是发送品牌管理请求的接口
import request from '@/utils/request'
import type { tradeMarkResponseData, tradeMarkParams } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加已有品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
}
//page表示获取第几页的数据 limit表示每一页有多少条数据
export const reqTradeMark = (page: number, limit: number) => {
  return request.get<any, tradeMarkResponseData>(
    `${API.TRADEMARK_URL}${page}/${limit}`,
  )
}
//添加或者修改已有品牌
export const reqUpdateTrademark = (data: tradeMarkParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
//删除已有品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETETRADEMARK_URL + `/${id}`)
}
