<template>
    <div class="top">
        <div class="left">
            <span class="lbtn">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化展示平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="right">当前时间为{{ time }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment';
let time = ref(moment().format('YYYY年-MM月-DD日:hh-mm-ss'));
//存储定时器
let timer = ref(0)
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年-MM月-DD日:hh-mm-ss')
    }, 1000)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style lang="scss">
.top {
    .left {
        flex: 1.5;

        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            float: right;
            width: 150px;
            height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: cover;
            line-height: 40px;
            text-align: center;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .center {
        flex: 1.5;
        background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
        background-size: cover;

        .title {
            width: 100%;
            height: 100%;

            line-height: 40px;
            text-align: center;
            color: #29fcff;
            font-size: 30px;

        }
    }

    .right {
        display: flex;
        flex: 1.5;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        justify-content: space-between;
        align-items: center;
        color: #29fcff;
        font-size: 20px;

        .rbtn {
            width: 150px;
            height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
            line-height: 40px;
            text-align: center;
        }

        .right {
            margin-left: 30px;
        }
    }
}
</style>