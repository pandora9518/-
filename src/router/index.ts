import { createRouter, createWebHashHistory } from 'vue-router'
//引入路由
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  //配置滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    }
  },
})
export default router
