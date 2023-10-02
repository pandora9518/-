<template>
    <div class="contain">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourism class="tourism"></Tourism>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <lines class="line"></lines>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="counter"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
//引入头部组件
import Top from './components/top/index.vue';
//引入左侧三个组件
import Tourism from './components/tourism/index.vue';
import Sex from './components/sex/index.vue';
import Age from './components/age/index.vue';

//引入中间三个组件
import Map from './components/map/index.vue';
import Lines from './components/lines/index.vue';

//引入右侧三个组件
import Rank from './components/rank/index.vue';
import Year from './components/year/index.vue';
import Counter from './components/counter/index.vue';

//存储屏幕实例
let screen = ref()
onMounted(() => {
    screen.value.style = `transform:scale(${getScale()}) translate(-50%,-50%)`
})
//计算出放大或者缩小的尺寸
const getScale = (w = 1920, h = 1080) => {
    const ww = innerWidth / 1920;
    const hh = innerHeight / 1080;
    return ww < hh ? ww : hh
}
window.onresize = () => {
    screen.value.style = `transform:scale(${getScale()}) translate(-50%,-50%)`
}
</script>
<style lang="scss">
.contain {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;

        .top {
            display: flex;
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;
            width: 100%;
            height: 100%;

            .left {
                display: flex;
                flex: 1;
                width: 100%;
                height: 100%;
                flex-direction: column;


                .tourism {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 3;
                }

                .line {
                    flex: 1;
                }
            }

            .right {
                display: flex;
                flex: 1;
                flex-direction: column;
                margin-left: 20px;

                .rank {
                    flex: 1.3;
                }

                .year {
                    flex: 1;
                }

                .counter {
                    flex: 1;

                }
            }
        }
    }
}
</style>