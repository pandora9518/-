//定义store中state数据的存储数据类型
import type { RouteRecordRaw } from 'vue-router'
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  avatar: string
  username: string
  buttons: string[]
}
