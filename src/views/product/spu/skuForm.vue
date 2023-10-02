<template>
    <el-form label-width="100px">
        <el-form-item label="sku名称">
            <el-input placeholder="SKU名称" v-model="skuParamsValue.skuName"></el-input>
        </el-form-item>

        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParamsValue.price"></el-input>
        </el-form-item>

        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParamsValue.weight"></el-input>
        </el-form-item>

        <el-form-item label="sku描述">
            <el-input placeholder="sku描述" type="textarea" v-model="skuParamsValue.skuDesc"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item :label="item.attrName" v-for="(item, index) in skuAttrValue" :key="item.id">
                    <el-select v-model="item.skuAttrAndValueId">
                        <!-- 收集属性Id和属性值的id拼接 -->
                        <el-option :value="`${item.id}:${skuAttr.id}`" :label="skuAttr.valueName"
                            v-for="(skuAttr, index) in item.attrValueList" :key="skuAttr.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item :label="item.saleAttrName" v-for="(item, index) in skuSaleAttr" :key="item.id">
                    <el-select v-model="item.saleAttrAndValueId">
                        <el-option :label="saleAttr.saleAttrValueName" :value="`${item.id}:${saleAttr.id}`"
                            v-for="(saleAttr, index) in item.spuSaleAttrValueList" :key="saleAttr.id"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>
        <el-form-item>
            <el-table border :data="skuImageList" ref="table">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" :title="row.imgName" style="width: 80px; height: 80px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="warning" size="large" @click="setSkuImage(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">确认</el-button>
            <el-button type="info" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { reqAttrValue } from '@/api/product/attr/index';
import { reqSpuImageList, reqSpuSaleAttr } from '@/api/product/spu'
import { SpuData, SpuImage } from '@/api/product/spu/type';
import type { skuInfo } from '@/api/product/spu/type'
import { ref, reactive } from 'vue';
import { reqSkuSaveInfo } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene'])
//商品基础属性
let skuAttrValue = ref<any>([]);
//Spu图片
let skuImageList = ref<any>([])
//商品基础属性
let skuSaleAttr = ref<any>([])
//sku数据参数
let skuParamsValue = reactive<skuInfo>({
    category3Id: "",//三级分类的id
    tmId: "",//商品品牌id
    spuId: 0,

    skuName: "",
    price: "",
    weight: "",//sku重量
    skuDesc: "",//sku详细描述
    skuDefaultImg: "",//sku图片默认地址

    skuAttrValueList: [],
    skuSaleAttrValueList: [],
})
//获取table实例
let table = ref()
//保存sku数据并发送请求
let save = async () => {

    //整理skuAttr数据
    let skuAttr = skuAttrValue.value.reduce((pre: any, next: any) => {
        //这里是第二个参数[]代表初始值 pre是上一次归并的返回值 next是数组当前项的值 
        if (next.skuAttrAndValueId) {

            let [attrId, valueId] = next.skuAttrAndValueId.split(':')
            pre.push({
                attrId,
                valueId
            })
        }
        return pre
    }, [])
    //赋值
    skuParamsValue.skuAttrValueList = skuAttr;

    //整理saleAttr数据
    let saleAttr = skuSaleAttr.value.reduce((pre: any, next: any) => {
        //这里是第二个参数[]代表初始值 pre是上一次归并的返回值 next是数组当前项的值 
        if (next.saleAttrAndValueId) {

            let [saleAttrId, saleAttrValueId] = next.saleAttrAndValueId.split(':')
            pre.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return pre
    }, [])
    //赋值
    skuParamsValue.skuSaleAttrValueList = saleAttr;
    let result: any = await reqSkuSaveInfo(skuParamsValue);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: 'SKU添加成功'
        })
        $emit('changeScene', { flag: 0, params: '' })
    } else[
        ElMessage({
            type: 'error',
            message: 'SKU添加失败'
        })
    ]

}
//取消
let cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}
//设置skuImage图片
let setSkuImage = (row: SpuImage) => {
    skuParamsValue.skuDefaultImg = row.imgUrl;
    skuImageList.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    });
    table.value.toggleRowSelection(row, true)

}
//初始化sku 发请求和传递参数
let initAddSkuDate = async (c1Id: number | string, c2Id: number | string, row: SpuData) => {
    //清除上次留下的sku数据
    skuParamsValue = {
        category3Id: "",//三级分类的id
        tmId: "",//商品品牌id
        spuId: 0,

        skuName: "",
        price: "",
        weight: "",//sku重量
        skuDesc: "",//sku详细描述
        skuDefaultImg: "",//sku图片默认地址

        skuAttrValueList: [],
        skuSaleAttrValueList: [],
    }
    //将父组件的c3Id和spuId存储
    skuParamsValue.category3Id = row.category3Id;
    skuParamsValue.spuId = (row.id as number);
    skuParamsValue.tmId = row.tmId;
    //商品基础属性
    let result: any = await reqAttrValue(c1Id, c2Id, row.category3Id);
    //商品图片
    let result1: any = await reqSpuImageList(row.id as number);
    //某个SPU产品属性
    let result2: any = await reqSpuSaleAttr(row.id as number);
    //存储商品基础属性
    skuAttrValue.value = result.data;
    //存储商品图片
    skuImageList.value = result1.data;
    //存储商品销售属性
    skuSaleAttr.value = result2.data;
}
defineExpose({ initAddSkuDate })
</script>
<style lang="sass">
    
</style>