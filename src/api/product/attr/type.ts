export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//这里是数据的格式
export interface CategoryObj {
  id: number
  createTime: string
  updateTime: string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
//属性仓库类型
export interface CategoryStore {
  c1Arr: CategoryObj[]
  c1Id: string | number

  c2Arr: CategoryObj[]
  c2Id: string | number

  c3Arr: CategoryObj[]
  c3Id: string | number
}
//属性与属性值类型
export interface AttrValue {
  id?: number
  createTime: null
  updateTime: null
  valueName: string
  attrId?: number
  flag?: boolean
}
//属性数组
export type AttrList = AttrValue[]
//属性接口返回数据
export interface AttrResponse {
  id?: number
  createTime: null
  updateTime: null
  attrName: string
  categoryId: number | string //属于哪一个三级分类
  categoryLevel: 3 //
  attrValueList: AttrList
}
//属性接口数据数组
export type AttrResponseList = AttrResponse[]
//属性接口的总数据
export interface AttrResponseData extends ResponseData {
  data: AttrResponseList
}
