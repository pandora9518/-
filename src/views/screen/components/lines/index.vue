<template>
    <div class="box4">
        <div class="title">
            <p>未来七天游客量趋势图</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
    let myCharts = echarts.init(charts.value);
    myCharts.setOption({
        title: {
            text: '访问量',
            top: 35,
            left: 10
        },
        xAxis: {
            type: 'category',
            //两侧不留白
            boundaryGap: false,
        },
        yAxis: {
            splitLine: {
                show: false
            },
            //轴线的设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            }
        },
        series: {
            type: 'line',
            data: ['1454', '145', '2000', '154', '465', '98', '58'],

            smooth: true,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'red' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },

    })
})
</script>
<style lang="scss">
.box4 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 10px;

    .title {
        margin-left: 20px;

        p {
            font-size: 20px;
            color: white;
        }
    }

    .charts {
        height: 300px;
        width: 100%;
    }
}
</style>