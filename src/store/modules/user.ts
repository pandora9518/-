//创建user仓库
import { defineStore } from 'pinia'
//引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
//引入类型限制
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
// import { userState } from '@/store/modules/types/type'
//获取存储和获取token方法
import { GET_TOKEN, SET_TOKEN, DELETE_TOKEN } from '@/utils/token'
//获取动态表单 获取动态路由各个数据
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import { userState } from './types/type'
//将路由过滤的回调 routes是要选出来的路由名
const filterAsyncRoutes = (asyncRoutes: any, routes: any) => {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}
//引入路由器添加路由
import router from '@/router'
//引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'

export default defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      avatar: '',
      username: '',
      buttons: [],
    }
  },
  actions: {
    async login(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)

      if (result.code == 200) {
        //本地存储token值
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        //表示登录成功了
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async getUserInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.avatar = result.data.avatar
        this.username = result.data.name
        //存储按钮数据
        this.buttons = result.data.buttons
        //过滤异步路由
        const userAsyncRoutes = filterAsyncRoutes(
          cloneDeep(asyncRoutes),
          result.data.routes,
        )
        //将过滤出的异步路由和任意路由 常量路由结合
        this.menuRoutes = [...constantRoutes, ...userAsyncRoutes, anyRoutes]
        //添加路由器 将过滤出的异步路由和任意路由结合
        const addRoutes = [...userAsyncRoutes, anyRoutes]
        addRoutes.forEach((item) => {
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },
    async logout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        DELETE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error('无法退出登录'))
      }
      //这里是返回移除是否成功+
    },
  },
  getters: {},
})
