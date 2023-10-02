//这里发送SPU请求获取数据
import request from '@/utils/request'
import type {
  SpuResponseData,
  skuInfoDate,
  SpuData,
  TrademarkResponseData,
  SpuImageResponseData,
  SpuSaleAttrResponseData,
  SpuAttrResponseList,
  skuInfo,
} from './type'
enum API {
  //获取SPU数据接口
  SPUATTR_URL = '/admin/product/',
  //获取商品品牌接口
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取Spu图片接口
  SPUIMAGE_URL = '/admin/product/spuImageList',
  //获取Spu属性接口
  SPUSALEATTR_URL = '/admin/product/spuSaleAttrList',
  //获取属性数量接口
  SPUATTRLIST_URL = '/admin/product/baseSaleAttrList',
  //添加SPU接口
  SPUADD_URL = '/admin/product/saveSpuInfo',
  //修改Spu接口
  SPUUPDATE_URL = '/admin/product/updateSpuInfo',
  //添加一个新的SKU组件
  SAVESKU_URL = '/admin/product/saveSkuInfo',
  //获取sku产品接口
  SKUINFO_URL = '/admin/product/findBySpuId/',
  //删除spu产品接口
  SPUDELETE_URL = '/admin/product/deleteSpu/',
}
//获取SPU产品请求
export const reqSpuDate = (
  page: number,
  limit: number,
  c3Id: number | string,
) =>
  request.get<any, SpuResponseData>(
    API.SPUATTR_URL + `${page}/${limit}?category3Id=${c3Id}`,
  )
//获取商品品牌
export const reqAllTrademark = () =>
  request.get<any, TrademarkResponseData>(API.ALLTRADEMARK_URL)
//获取品牌产品图片接口
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuImageResponseData>(API.SPUIMAGE_URL + `/${spuId}`)
//获取SPU属性接口
export const reqSpuSaleAttr = (spuId: number) =>
  request.get<any, SpuSaleAttrResponseData>(API.SPUSALEATTR_URL + `/${spuId}`)
//获取产品属性数量接口
export const reqAllAttr = () =>
  request.get<any, SpuAttrResponseList>(API.SPUATTRLIST_URL)
//添加和修改spu产品数据的接口
export const reqAddOrUpdate = (skuInfo: SpuData) => {
  console.log(skuInfo)

  if (skuInfo.id) {
    return request.post<any, any>(API.SPUUPDATE_URL, skuInfo)
  } else {
    return request.post<any, any>(API.SPUADD_URL, skuInfo)
  }
}
//添加一个新的sku
export const reqSkuSaveInfo = (skuInfo: skuInfo) => {
  return request.post(API.SAVESKU_URL, skuInfo)
}
//获取sku产品
export const reqSkuInfo = (spuId: string | number) =>
  request.get<any, skuInfoDate>(API.SKUINFO_URL + spuId)
//删除spu产品
export const reqDeleteSpu = (spuId: number) =>
  request.delete<any, any>(API.SPUDELETE_URL + spuId)
