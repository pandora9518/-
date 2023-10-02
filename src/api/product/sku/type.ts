export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//sku属性ts类型
export interface SkuAttr {
  id?: number
  skuId: number | string
  valueId: number | string
}
//sku销售属性ts类型
export interface SkuSaleAttr {
  saleAttrId: number
  saleAttrValueId: number
}
//skuInfo数据类型
export interface skuInfo {
  category3Id?: number | string //三级分类的id
  tmId?: number | string //商品品牌id
  spuId?: number | string
  id?: number //sku的Id
  skuName?: string
  price?: number | string
  weight?: string //sku重量
  skuDesc?: string //sku详细描述
  skuDefaultImg?: string //sku图片默认地址
  isSale?: number //sku上架状态
  skuAttrValueList?: SkuAttr[]
  skuSaleAttrValueList?: SkuSaleAttr[]
}
//skuList产品接口
export interface skuListResponseDate extends ResponseData {
  data: {
    records: skuInfo[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
//获取商品详情ts类型
export interface skuInfoResponseData extends ResponseData {
  data: skuInfo
}
