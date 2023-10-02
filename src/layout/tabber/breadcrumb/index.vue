<template>
    <div class="tabber_left">
        <el-icon @click="foldMenu">
            <component :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
        </el-icon>
        <div class="tabber_left_Breadcrumb">
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(route) in  $route.matched " v-show="!route.meta.isHidden" :to="route.path">
                    <el-icon style="margin:0 5px">
                        <component :is="route.meta.icon"></component>
                    </el-icon>
                    <span>{{ route.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router'
let LayoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
let foldMenu = () => {
    LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>
<style scoped lang="scss"></style>