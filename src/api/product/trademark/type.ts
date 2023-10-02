//这里是接口数据的类型限制
export interface tradeMarkData {
  code: number
  message: string
  ok: boolean
}
//定义records数组的类型
export interface recordResponseData {
  id: 5182
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}
export type records = recordResponseData[]
//返回数据的总类型
export interface tradeMarkResponseData extends tradeMarkData {
  data: {
    records: records
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
//增加或者更新商品列表参数类型
export interface tradeMarkParams {
  id?: number
  tmName: string
  logoUrl: string
}
