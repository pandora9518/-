//这里是一键注册全局组件
import SvgIcon from '@/components/SvgIcon.vue'
import Category from '@/components/Category/index.vue'
const allComponents: any = { SvgIcon, Category }
//引入全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  install(app: any) {
    Object.keys(allComponents).forEach((item) => {
      app.component(item, allComponents[item])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
