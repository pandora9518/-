<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts">
            1
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
    let myCharts = echarts.init(charts.value);

    let option = {
        backgroundColor: bgColor,
        color: color,
        // tooltip: {
        //     trigger: 'item'
        // },
        title: [{
            text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
            top: 'center',
            left: 'center',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#fefefe',
                        padding: [10, 0]
                    },
                    val: {
                        fontSize: 32,
                        fontWeight: 'bolder',
                        color: '#fefefe',
                    }
                }
            }
        }, {
            text: '单位：个',
            top: 20,
            left: 20,
            textStyle: {
                fontSize: 14,
                color: '#666666',
                fontWeight: 400
            },
            show: false
        }],
        series: [{
            type: 'pie',
            roseType: 'radius',
            radius: ['25%', '60%'],
            center: ['50%', '50%'],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    borderColor: bgColor,
                    borderWidth: 2
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 120,
                    lineStyle: {
                        // color: '#e6e6e6'
                    }
                }
            },
            label: {
                normal: {
                    formatter: (params: any) => {
                        return (
                            '{icon|●}{name|' + params.name + '}\n{value|' +
                            formatNumber(params.value) + '}'
                        );
                    },
                    // padding: [0 , -100, 25, -100],
                    rich: {
                        icon: {
                            fontSize: 16,
                            color: 'inherit'
                        },
                        name: {
                            fontSize: 18,
                            padding: [0, 0, 0, 10],
                            color: '#fefefe'
                        },
                        value: {
                            fontSize: 14,
                            fontWeight: 'bolder',
                            padding: [10, 0, 0, 20],
                            color: 'inherit'
                            // color: '#333333'
                        }
                    }
                }
            },
        }]
    };
    myCharts.setOption(option)
})
let bgColor = '#001037';
let title = '总量';
let color = ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];
let echartData = [{
    name: "18到30",
    value: "3200"
},
{
    name: "小于18",
    value: "2920"
},
{
    name: "30~40",
    value: "2200"
},
{
    name: "40到60",
    value: "2020"
},
{
    name: "60以上",
    value: "3200"
}
];

let formatNumber = function (num: any) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
}
let total = echartData.reduce((a, b) => {
    return a + (b.value as any) * 1
}, 0);



</script>
<style scoped lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-rb.png) no-repeat;
    background-size: cover;

    .title {
        margin-left: 20px;

        p {
            font-size: 20px;
            color: white;
        }
    }

    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>