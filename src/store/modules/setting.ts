//创建layout小型仓库
import { defineStore } from 'pinia'
const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
  actions: {},
})
export default useLayoutSettingStore
