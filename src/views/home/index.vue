<template>
    <el-card>
        <div class="box">
            <img :src="userInfo.avatar" alt="" class="avatar">
            <div>
                <h3 class="title">{{ getTime() + '好' + userInfo.username }}</h3>
                <p class="name">甄选运营平台</p>
            </div>
        </div>
        <!-- 矢量图 -->
    </el-card>
    <div class="bottom">
        <svg-icon name="害羞" width="400px" height="200px"></svg-icon>
        <svg-icon name="吐舌" width="400px" height="200px"></svg-icon>
    </div>
</template>
<script setup lang="ts">
//引入用户信息的仓库
import useUserInfo from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userInfo = useUserInfo()


</script>
<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .title {
        font-size: 30px;
        margin-top: 20px;
    }

    .name {
        font-style: italic;
        margin-top: 10px;
        color: skyblue;
    }


}

.bottom {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
}
</style>