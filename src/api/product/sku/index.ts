import request from '@/utils/request'
import { skuListResponseDate, skuInfoResponseData } from './type'
enum API {
  //获取sku产品接口
  SKULIST_URL = '/admin/product/list/',
  //上架sku产品
  ONSALE_URL = '/admin/product/onSale/',
  //下架sku产品
  REMOVESALE_URL = '/admin/product/cancelSale/',
  //获取Sku详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  //删除sku
  DELETESKU_URL = '/admin/product/deleteSku/',
}

//获取sku产品
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, skuListResponseDate>(API.SKULIST_URL + `${page}/${limit}`)
//上架
export const reqOnSaleSpu = (skuId: number) =>
  request.get<any, any>(API.ONSALE_URL + skuId)
//下架
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.REMOVESALE_URL + skuId)
//获取sku详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, skuInfoResponseData>(API.SKUINFO_URL + skuId)
//删除sku
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuId)
