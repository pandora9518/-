## Matter in Project

### Element-Plus问题

###### 1.分页器事件触发 current-change  和 size-change 

​	current-change是当前页编号发生变化时候触发

​	size-change是`page-size` 改变时触发(page-size是当前页数据条数)



​	这两个方法都会默认传入当前页的编号 注意有两种写法

​	current-change = getSpu()  以及

​	current-change = getSpu

​	第一种方式会取消传入当前页的编号 第二种就是默认传入当前页的编号(pageNo可能先发生变化再传入)

2.SPU和SKU是什么

SPU(标准产品单元standard product unit)---人话:就是一个产品品牌 有名称 介绍, 

3.表单验证功能  实现所有验证通过后才能发送请求

form实例上有一个方法 当全部验证通过返回成功pormise否则失败

### Vue3问题

1.v-show和v-if指令都能控制组件 区别在哪里

v-show中DOM元素始终是存在的，v-show只是利用元素的[display属性](https://so.csdn.net/so/search?q=display属性&spm=1001.2101.3001.7020)控制着元素的显示隐藏

 v-if 指令，就是根据表达式值的真假来销毁或者重建一个我们绑定的DOM元素

2.使用 `<script setup>` 的组件是**默认关闭**的，组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定

可以通过 `defineExpose` 来显式指定在 `<script setup>` 组件中要暴露出去的属性

注意defineExpose要卸载变量或者方法的后面

将一个字符串以某个符号分割开split  slice是提取字符串的

next({...*to*})*表示加载完异步组件再跳转*

数组filiter过滤 递归可以过滤出某一些对象 includes方法可以判断数组中是否有某个元素
