<template>
    <div class="tabber_right">
        <el-button icon="Refresh" circle @click="goFsh" />
        <el-button icon="FullScreen" circle @click="goFullScreen" />
        <el-popover placement="bottom" title="主题设置" width="300px" trigger="hover">
            <el-form>
                <el-form-item label="主题颜色">
                    <!-- 取色器组件 -->
                    <el-color-picker @change="updateColor" v-model="color" show-alpha :predefine="predefineColors" />
                </el-form-item>
                <el-form-item label="暗黑模式">
                    <!-- 暗黑模式开关 -->
                    <el-switch v-model="dark" class="mt-2" inline-prompt style="margin-left: 24px" active-icon="MoonNight"
                        inactive-icon="Sunny" @change="addDark" />
                </el-form-item>
            </el-form>
            <template #reference>
                <el-button icon="Setting" circle />
            </template>
        </el-popover>
        <!-- 这里是下拉菜单 -->
        <img :src="userStore.avatar" style="height: 30px;width: 30px;margin:0 10px">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
let LayoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore()
let $router = useRouter();
//获取路由
let $route = useRoute()
//暗黑模式开关
let dark = ref<boolean>(false);
let goFsh = () => {
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
}
let goFullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//退出登录的方法
let Logout = async () => {
    await userStore.logout();
    $router.push({ path: '/login', query: { redirect: $route.path } });
}
//取色器取出的颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
//添加暗黑模式回调
const addDark = () => {
    let html = document.documentElement;
    html.className = dark.value ? "dark" : ''
}
//改变主题颜色回调
const updateColor = () => {
    let html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value)
}
</script>
<style scoped lang="scss"></style>