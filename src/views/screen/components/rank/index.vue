<template>
    <div class="box5">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
let charts = ref();
onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        //图形标题
        title: {
            text: '景区排行',
            textStyle: {
                fontSize: 18,
                color: 'cyan'
            },
            left: '40%',
            subtext: '各大景区排行',
            subtextStyle: {
                fontSize: 16,
                color: 'cyan'
            }
        },
        //x|y轴样式设置
        xAxis: {
            type: 'category'
        },
        yAxis: {},
        //图形位置
        grid: {
            left: 20,
            bottom: 20,
            right: 20
        },
        series: [{
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            label: {
                show: true,
                position: 'insideTop',
                fontSize: 16,
            },
            showBackground: true,
            backgroundStyle: {
                //底部背景的颜色
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'black' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            itemStyle: {
                borderRadius: [5, 5, 0, 0],
            }
        }],
    })
})
</script>
<style scoped lang="scss">
.box5 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 10px 0;

    .title {
        margin-left: 10px;

        p {
            font-size: 20px;
            color: white;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>