<template>
    <template v-for="(menuRoute) in menuList" :key="menuRoute.path">
        <!-- 没有子元素的单一菜单 -->
        <template v-if="!menuRoute.children">
            <el-menu-item :index="menuRoute.path" v-if="!menuRoute.meta.hidden" @click="goRoute">
                <!-- 这里存储图标 -->
                <el-icon>
                    <component :is="menuRoute.meta.icon"></component>
                </el-icon>

                <template #title>
                    <span>{{ menuRoute.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有一个子元素菜单 -->
        <template v-if="!menuRoute.meta.hidden">
            <el-menu-item v-if="menuRoute.children && menuRoute.children.length == 1" :index="menuRoute.path"
                @click="goRoute">
                <el-icon>
                    <component :is="menuRoute.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ menuRoute.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有两个以上的子路由 -->
        <el-sub-menu v-if="menuRoute.children && menuRoute.children.length > 1" :index="menuRoute.path">

            <template #title>
                <el-icon>
                    <component :is="menuRoute.meta.icon"></component>
                </el-icon>
                <span>
                    {{ menuRoute.meta.title }}
                </span>
            </template>
            <Menu :menuList="menuRoute.children"></Menu>
        </el-sub-menu>

    </template>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList']);
let $router = useRouter();

let goRoute = (route: any) => {
    $router.push(route.index);
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang="scss"></style>