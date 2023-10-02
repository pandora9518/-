<template>
    <div class="layout_container">
        <div class="layout_slide" :class="LayoutSettingStore.fold ? 'fold' : ''">
            <Logo></Logo>
            <el-menu background-color="$base-menu-bgc" text-color="white" :default-active="$route.path"
                :collapse=LayoutSettingStore.fold>
                <el-scrollbar class="scrollbar">
                    <Menu :menuList="menuRoutes"></Menu>
                </el-scrollbar>
            </el-menu>

        </div>
        <div class="layout_tabbar" :class="LayoutSettingStore.fold ? 'fold' : ''">
            <Tabber></Tabber>
        </div>
        <div class="layout_main" :class="LayoutSettingStore.fold ? 'fold' : ''">
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabber from './tabber/index.vue'
import useMenuRoutes from '@/store/modules/user'
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()
let menuRoutes = useMenuRoutes().menuRoutes;
//引入LayoutSetting小仓库

let $route = useRoute();
//控制主要内容区域的刷新属性

</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    display: flex;
    font-size: 20px;

    .layout_slide {
        height: 100vh;
        width: $base-menu-width;
        background-color: $base-menu-bgc;

        .el-menu {
            border-right: 1px solid $base-menu-bgc;
        }

        &.fold {
            width: $base-menu-min-width;
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }
    }

    .layout_tabbar {
        position: fixed;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;

        &.fold {
            left: $base-menu-min-width;
            width: calc(100vw - $base-menu-min-width);
        }
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        overflow: auto;
        padding: 15px;

        &.fold {
            left: $base-menu-min-width;
            width: calc(100vw - $base-menu-min-width);
        }
    }
}
</style>