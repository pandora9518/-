<template>
    <el-card>
        <el-table style="margin: 10px 0;" border :data="skuArr">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" width="160px" prop="skuName"></el-table-column>
            <el-table-column label="描述" width="160px" prop="skuDesc"></el-table-column>
            <el-table-column label="图片" width="160px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="图片加载中" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="重量" width="160px" prop="weight"></el-table-column>
            <el-table-column label="价格(元)" width="160px" prop="price"></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row, $index }">
                    <el-button :type="row.isSale == 1 ? 'info' : 'primary'" size="small"
                        :icon="row.isSale == 1 ? 'Bottom' : 'Top'" @click="updateSale(row)"></el-button>
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="info" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>

                    <el-popconfirm title="你确定删除商品吗" @confirm="remove" width="200px">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"> </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handler"
            @current-change="getSku" />
        <!-- 商品详情drawer -->
        <el-drawer v-model="drawer" direction="rtl" style="font-size: 16px;">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="(item, index) in skuInfo.skuAttrValueList" :key="item.id">{{ item.attrName
                        }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="(item, index) in skuInfo.skuSaleAttrValueList" :key="item.id">{{ item.saleAttrName
                        }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="(item) in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>

    </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqSkuList, reqCancelSale, reqOnSaleSpu, reqSkuInfo, reqRemoveSku } from '@/api/product/sku/index';
import { skuListResponseDate, skuInfo } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus';
//当前页数
let pageNo = ref<number>(1);
//每页的产品总数
let pageSize = ref<number>(10);
//存储产品总数
let total = ref<number>(0);
//存储sku产品列表
let skuArr = ref<skuInfo[]>([]);
//存储sku详情信息
let skuInfo = ref<any>({});
//控制商品抽屉展示
let drawer = ref<boolean>(false)
onMounted(() => {
    getSku()
})
//获取sku产品列表
let getSku = async (page = 1) => {
    pageNo.value = page;
    //发请求获取sku产品列表
    let result: skuListResponseDate = await reqSkuList(pageNo.value, pageSize.value);
    total.value = result.data.total;
    skuArr.value = result.data.records;
}
//页面包含数据个数改变时 调用函数
let handler = (num: number) => {
    //默认返回到第一页
    getSku()
}
//更新产品上架状态
let updateSale = async (row: skuInfo) => {

    if (row.isSale) {
        //表示商品上架->下架商品
        let result: any = await reqCancelSale((row.id as number));
        if (result.code == 200) {
            ElMessage({
                type: 'error',
                message: '产品已下架'
            })
            getSku()
        } else {
            ElMessage({
                type: 'error',
                message: '产品下架失败'
            })
        }
    } else {
        let result: any = await reqOnSaleSpu((row.id as number));
        if (result.code == 200) {
            ElMessage({
                type: 'success',
                message: '产品上架成功'
            })
            getSku()
        }
    }
}
let findSku = async (row: skuInfo) => {
    //换出抽屉
    drawer.value = true
    let result = await reqSkuInfo((row.id as number));
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '获取商品详情成功'
        })
        skuInfo.value = result.data;
    } else {
        ElMessage({
            type: 'error',
            message: '获取商品详情失败'
        })
    }

}
//删除sku数据
let remove = async (row: skuInfo) => {
    let result = await reqRemoveSku((row.id as number));

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除商品成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: result.message
        })
    }
}
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>