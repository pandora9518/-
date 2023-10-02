<template>
    <Category :scene="scene"></Category>
    <el-card class="box-card">
        <!-- 这里是SPU模块 -->

        <div v-show="scene == 0">
            <!-- 添加按钮 -->
            <el-button type="primary" size="default" icon="Plus" :disabled="CategoryStore.c3Id ? false : true"
                @click="addSpu">添加SPU</el-button>
            <!-- 展示SPU数据 -->

            <el-table border style="margin: 10px 0;" :data="records">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description"></el-table-column>
                <el-table-column label="SPU操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Plus" title="添加一个SKU" @click="addSku(row)"></el-button>
                        <el-button type="primary" size="small" icon="Edit" title="修改某个SPU"
                            @click="updataSpu(row)"></el-button>
                        <el-button type="primary" size="small" icon="View" title="查看SKU" @click="checkSku(row)"></el-button>
                        <el-button type="primary" size="small" icon="Delete" title="删除Spu"
                            @click="removeSpu(row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getSpu"
                @size-change="getSpu()" />
        </div>

        <!-- 添加SPU模块 -->
        <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spuForm"></SpuForm>
        <!-- SKU模块 -->
        <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="skuForm"></SkuForm>
        <!-- sku对话框模块 -->
        <el-dialog title="SKU列表" v-model="skuFlag">
            <el-table :data="skuDate">
                <el-table-column label="sku名字" prop="skuName"></el-table-column>
                <el-table-column label="sku价格" prop="price"></el-table-column>
                <el-table-column label="sku重量" prop="weight"></el-table-column>
                <el-table-column label="sku图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqSpuDate, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu/index';
import type { SpuResponseData, skuInfo, SpuData, SpuRecord, skuInfoDate } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
//引入spu组件
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
//存储SpuForm组件实例
let spuForm = ref();
//存储SkuForm组件实例
let skuForm = ref();
//存储当前页码
let pageNo = ref<number>(1);
//存储每页产品数量
let limit = ref<number>(3);
//控制sku列表的展示
let skuFlag = ref<boolean>(false);
//存储某一个spu对应所有sku产品数据
let skuDate = ref<skuInfo[]>()

let CategoryStore = useCategoryStore();
let records = ref<SpuRecord>([]);
let total = ref<number>(10)
//控制各个场景切换
let scene = ref<number>(0)
//监视c3Id是否存在判断获取时间
watch(() => CategoryStore.c3Id, () => {
    getSpu()
})
//发请求获取Spu数据
let getSpu = async (page = 1) => {

    pageNo.value = page;
    let result: SpuResponseData = await reqSpuDate(pageNo.value, limit.value, CategoryStore.c3Id);
    if (result.code == 200) {
        records.value = result.data.records;
        // limit.value = result.data.size;
        total.value = result.data.total
    } else {
        ElMessage({
            type: 'error',
            message: '获取Spu数据失败'
        })
    }

}
//添加Spu方法
let addSpu = () => {

    scene.value = 1;
    spuForm.value.initAddSpuDate(CategoryStore.c3Id)
}
//修改Spu方法
let updataSpu = (row: SpuData) => {
    scene.value = 1;
    //获取三级分类的id
    spuForm.value.initEditSpuData(row)
}
//接收SpuForm传递数据
let changeScene = (obj: any) => {

    scene.value = obj.flag;
    if (obj.params == 'update') {
        getSpu(pageNo.value)
    } else {
        getSpu()
    }

}
//添加Sku方法
let addSku = (row: SpuData) => {
    scene.value = 2;
    //传递id 发送请求
    skuForm.value.initAddSkuDate(CategoryStore.c1Id, CategoryStore.c2Id, row);

}
//查看sku
let checkSku = async (row: SpuData) => {


    let result: skuInfoDate = await reqSkuInfo(row.id as number);
    if (result.code == 200) {
        skuDate.value = result.data;
        skuFlag.value = true;
    } else {
        ElMessage({
            type: 'error',
            message: '未查询到sku产品数据'
        })
    }
}
//删除spu产品接口
let removeSpu = async (spuId: number) => {
    let result = await reqDeleteSpu(spuId);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除SPU成功'
        })
        getSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除SPU失败'
        })
    }
}
//在组件销毁前清空pinia中数据
onBeforeUnmount(() => {
    CategoryStore.$reset()
})
</script> 
<style>
.box-card {
    width: 1100px;
    margin: 10px auto;
}
</style>