//这里是路由鉴权 路由守卫 判断路由跳转
import router from '@/router'
//引入进度条插件
import nprogress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import useUserStore from '@/store/modules/user'
//引入大仓库 大菠萝
import Pinia from '@/store/index'

const userStore = useUserStore(Pinia)
router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`

  nprogress.start()
  if (to.path == '/login') {
    next()
  } else {
    //这里就是访问除了登录路由的其他路由
    const token = userStore.token
    const username = userStore.username
    if (token) {
      //这里就是有已经登录过
      if (username) {
        //判断是否获取了用户信息
        //已获取用户信息
        next()
      } else {
        try {
          await userStore.getUserInfo()
          //表示加载完异步组件再跳转
          next({ ...to })
        } catch (error) {
          //token过期
          userStore.logout
          next({ path: '/login', query: { redirect: to.path } })
          console.log((error as Error).message)
        }
      }
      //判断是否有query值记录路径
    } else {
      //未登录访问路由
      next('/login')
    }
  }
})
router.afterEach(() => {
  nprogress.done()
})
