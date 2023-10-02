<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts">
            789
        </div>
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
            text: '男女比例',
            textStyle: {
                color: 'skyblue',

            },
            left: '40%'
        },
        //去掉x轴
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        //去掉y轴
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: '20',
                z: 100,
                itemStyle: {
                    color: 'skyblue',
                    borderRadius: 20
                }
            },
            {
                type: 'bar',
                data: [100],

                barWidth: '20',
                barGap: '-100%',

                itemStyle: {
                    color: 'hotpink',
                    borderRadius: 20
                }
            }
        ],
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    })
})
</script>
<style scoped lang="scss">
.box1 {
    width: 100%;
    height: 90%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 10px 0;


    .title {
        margin-left: 20px;

        p {
            font-size: 20px;
            color: white;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            display: flex;
            width: 100px;
            height: 105px;
            background: url(../../images/man-bg.png);
            justify-content: center;
            align-items: center;
            margin-right: 30px;
        }

        .woman {
            display: flex;
            width: 100px;
            height: 105px;
            background: url(../../images/woman-bg.png);
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        margin: 10px 50px;
        justify-content: space-between;
        color: white;
    }

    .charts {
        height: 80px;
        width: 100%;
        margin: 30px 50px;
    }
}
</style>