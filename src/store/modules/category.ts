//这里存储的是分类仓库
import { defineStore } from 'pinia'
import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from '@/api/product/attr'
import { CategoryResponseData, CategoryStore } from '@/api/product/attr/type'
export default defineStore('Category', {
  state: (): CategoryStore => {
    return {
      c1Id: '',
      c1Arr: [],

      c2Id: '',
      c2Arr: [],

      c3Id: '',
      c3Arr: [],
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponseData = await reqGetCategory1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    async getC2() {
      const result: CategoryResponseData = await reqGetCategory2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    async getC3() {
      const result: CategoryResponseData = await reqGetCategory3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})
