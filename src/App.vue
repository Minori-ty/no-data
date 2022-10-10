<template>
    <h1>demo1: no-data在里面:</h1>
    {{ option.xAxis.data.length !== 0 }}
    <el-button type="primary" @click="fetchData">获取数据</el-button>
    <div id="dom1" ref="dom1" class="echart">
        <el-empty description="暂无数据，请重新选择日期" v-if="option.xAxis.data.length === 0" class="no-data" />
    </div>

    <h1>demo2: no-data在外面:</h1>

    <el-button type="primary" @click="fetchData">获取数据</el-button>
    <div id="dom2" ref="dom2" class="echart" v-show="option.xAxis.data.length !== 0"></div>
    <div class="echart" v-show="option.xAxis.data.length === 0">
        <el-empty description="暂无数据，请重新选择日期" class="no-data" />
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const dom1 = ref<HTMLElement>()
const dom2 = ref<HTMLElement>()
let myChart1: echarts.ECharts
let myChart2: echarts.ECharts
const option = reactive({
    title: {
        text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
        data: ['销量'],
    },
    xAxis: {
        data: [] as string[],
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [] as number[],
        },
    ],
})

onMounted(() => {
    myChart1 = echarts.init(dom1.value as HTMLElement)
    myChart2 = echarts.init(dom2.value as HTMLElement)
})

/**
 * 获取数据
 */
async function fetchData() {
    const { data } = await axios.get<{ xAxis: string[]; yAxis: number[] }>('/api/get')
    option.xAxis.data = data.xAxis
    option.series[0].data = data.yAxis
    if (data.xAxis.length === 0) {
        myChart1.clear()
        return ElMessage({
            message: '数据为空，显示no-data',
            type: 'warning',
        })
    }
    myChart1.setOption(option)
    myChart2.setOption(option)
}
</script>

<style scoped>
.echart {
    width: 1200px;
    height: 500px;
    background-color: skyblue;
    position: relative;
}
</style>
