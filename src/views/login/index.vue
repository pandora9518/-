<template>
    <div class='login_contain'>
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <!-- 这里的xs是为了让可视区缩小时候只显示右侧表单 -->
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="userInfo" :rules="rules" ref="localForm">
                    <h1>Hello</h1>
                    <h2>欢迎来到尚硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="userInfo.username">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" show-password v-model="userInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" :loading="loading" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus'
//引入获取时间的方法
import { getTime } from '@/utils/time'
//存储表单信息
let userInfo = reactive({ username: 'admin', password: '111111' })
//控制登录加载中的数据
let loading = false
//引入router实例
let localForm = ref()
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

let validataUsername = (rule: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('用户名不符合规范'))
    }
}

const rules = {
    username: [
        { require: true, validator: validataUsername, trigger: 'change' },
        // { require: true, min: 6, message: '用户名至少六位', trigger: 'change' }
    ],
    password: [
        { require: true, min: 6, max: 18, message: '密码应该在6到18位之间', trigger: 'change', }
    ]
}
let login = async () => {
    //触发登录表单验证
    await localForm.value.validate();
    loading = true
    try {
        //发送请求获取用户信息
        await userStore.login(userInfo);
        ElNotification({
            type: 'success',
            title: `Hi,${getTime()}好`,
            message: '登录成功'
        })
        loading = false;
        if ($route.query.redirect) {
            $router.push({ path: ($route.query.redirect) as string });
        } else {
            $router.push('/')
        }

    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
        loading = false
    }
}

</script>
<!-- 引入图标 -->

<style scoped lang="scss">
.login_contain {
    // position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('../../assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 20px;
    }

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        color: white;
        font-size: 20px;
        margin: 20px 0;
    }

    .login_btn {
        width: 100%;
    }
}
</style>