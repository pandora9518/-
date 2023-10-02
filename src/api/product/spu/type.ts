//这里是SPU类型限制
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//SPU数据类型
export interface SpuData {
  id?: number
  createTime?: string
  updateTime?: string

  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string

  spuSaleAttrList: null | SaleAttrResponseData[]
  spuImageList: null | SpuImage[]
  spuPosterList?: null
}
//SPU数据数组类型u
export type SpuRecord = SpuData[]
//返回数据总类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: SpuRecord
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: false
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

//商品品牌ts类型
export interface Trademark {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}
//商品品牌接口数据类型
export interface TrademarkResponseData extends ResponseData {
  data: Trademark[]
}
//商品图片ts类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}

//产品图片数据类型
export interface SpuImageResponseData extends ResponseData {
  data: SpuImage[]
}
//产品属性数据
export interface SpuSaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
//产品属性数组
export type SpuSaleAttrValueList = SpuSaleAttrValue[]

export interface SaleAttrResponseData {
  id?: number | string
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  //添加控制编辑模式与显示模式的数据
  flag?: boolean
  //暂时存储待添加的属性值的数据
  spuSaleAttrValue?: string
  spuSaleAttrValueList: SpuSaleAttrValueList
}
//产品属性接口数据类型
export interface SpuSaleAttrResponseData extends ResponseData {
  data: SaleAttrResponseData[]
}
//产品属性数量接口
export interface SpuAttrList {
  id: number
  createTime: string
  updateTime: string
  name: string
}
//产品属性接口
export interface SpuAttrResponseList extends ResponseData {
  data: SpuAttrList[]
}

//这里是SKU数据类型
//sku属性ts类型
export interface SkuAttr {
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
  category3Id: number | string //三级分类的id
  tmId: number | string //商品品牌id
  spuId: number | string

  skuName: string
  price: number | string
  weight: string //sku重量
  skuDesc: string //sku详细描述
  skuDefaultImg: string //sku图片默认地址

  skuAttrValueList: SkuAttr[]
  skuSaleAttrValueList: SkuSaleAttr[]
}
export interface skuInfoResponseDate extends ResponseData {
  data: skuInfo
}
//获取spu产品对应的sku
export interface skuInfoDate extends ResponseData {
  data: skuInfo[]
}
