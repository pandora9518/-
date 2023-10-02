<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" v-model="SpuParamsData.spuName"></el-input>
        </el-form-item>

        <el-form-item label="SPU品牌">
            <el-select placeholder="请你选择品牌" v-model="SpuParamsData.tmId">
                <el-option v-for="(item) in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SPU描述">
            <el-input type="textarea" v-model="SpuParamsData.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="spuImgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" style="width: 100%;height: 100%;" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select :placeholder='remainSaleAttr.length ? `还有${remainSaleAttr.length}个属性未选择` : "未选择的属性为空"'
                v-model="saleAttrIdAndName">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item) in remainSaleAttr" :key="item.id"
                    :label="item.name"></el-option>
            </el-select>
            <el-button :disabled="saleAttrIdAndName ? false : true" type="primary" size="default" icon="Plus"
                style="margin-left: 10px;" @click="addSaleAttr">添加销售属性</el-button>
            <el-table border style="margin: 10px 0;" :data="spuSaleAttr">
                <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
                <el-table-column label="属性名" width="100px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <el-tag @close="row.spuSaleAttrValueList.splice($index, 1)"
                            v-for="(item) in row.spuSaleAttrValueList" :key="item.id" class="mx-1" closable
                            style="margin: 0 5px;" type="success">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.flag" @blur="toLook(row)" v-model="row.spuSaleAttrValue" placeholder="请输入属性值"
                            size="small" style="width:100px"></el-input>
                        <el-button v-else type="primary" size="small" icon="Plus" @click="toEdit(row)"></el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="100px">
                    <template #="{ row, $index }">
                        <!-- 点击用splice移除属性值数据 -->
                        <el-button type="danger" size="small" icon="Delete"
                            @click="spuSaleAttr.splice($index, 1)"></el-button>

                    </template>
                </el-table-column>
            </el-table>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { reqAllTrademark, reqSpuImageList, reqSpuSaleAttr, reqAllAttr, reqAddOrUpdate } from '@/api/product/spu/index';
import type { SpuData, SpuSaleAttrValue, SpuImageResponseData, SpuSaleAttrResponseData, Trademark, TrademarkResponseData, SpuAttrList, SaleAttrResponseData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';
//存储所有商品名称
let allTrademark = ref<Trademark[]>([]);
//存储商品图片
let spuImgList = ref<any>([]);
//存储商品attr属性
let spuSaleAttr = ref<SaleAttrResponseData[]>([]);
//存储商品属性数量和详情
let allSaleAttr = ref<SpuAttrList[]>([])
//控制照片墙预览对话框变量
let dialogVisible = ref<boolean>(false);
//存储照片墙照片数据
let dialogImageUrl = ref<string>('')
//添加或者修改SPU产品数据
let SpuParamsData = ref<SpuData>({
    category3Id: '',

    description: '',
    spuName: '',
    tmId: '',

    spuImageList: [],
    spuSaleAttrList: [],
}
)
//存储spu添加属性中收集到的属性
let saleAttrIdAndName = ref<string>('')
let $emit = defineEmits(['changeScene']);

let cancel = () => {
    $emit('changeScene', {
        flag: 0,
        params: 'update'
    });
}
//修改SPU获取数据
let initEditSpuData = async (row: SpuData) => {

    //某一个产品数据
    SpuParamsData.value = row;
    //获取所有商品品牌名称
    let result: TrademarkResponseData = await reqAllTrademark();
    allTrademark.value = result.data;
    //获取产品图片列表
    let result1: SpuImageResponseData = await reqSpuImageList((row.id as number));

    spuImgList.value = result1.data.map((item) => {
        //map可以遍历数组每一个值 返回函数值构成的数组
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    // spuImgList.value = result1.data
    //获取产品的属性列表
    let result2: SpuSaleAttrResponseData = await reqSpuSaleAttr((row.id as number));
    spuSaleAttr.value = result2.data;
    //获取产品的所有属性值
    let result3 = await reqAllAttr();
    allSaleAttr.value = result3.data;

}
//添加Spu获取数据
let initAddSpuDate = async (c3Id: number) => {
    Object.assign(SpuParamsData.value, {
        category3Id: '',

        description: '',
        spuName: '',
        tmId: '',

        spuImageList: [],
        spuSaleAttrList: [],
    })
    //重置照片墙数据
    spuImgList.value = [];
    //重置属性数据
    spuSaleAttr.value = [];
    //存储三级分类的id
    SpuParamsData.value.category3Id = c3Id;
    saleAttrIdAndName.value = '';
    //获取所有产品名称
    let result: TrademarkResponseData = await reqAllTrademark();
    //用Alltrademark存储产品名称
    allTrademark.value = result.data;
    //获取产品的所有属性值
    let result3 = await reqAllAttr();
    allSaleAttr.value = result3.data;
}
//对上传图片进行格式验证与大小校验的钩子
let beforeAvatarUpload = (file: any) => {
    if (file.type == 'image/jpg' || 'image/png' || 'image/gif') {
        if (file.size / 1024 / 1024 > 4) {
            ElMessage({
                type: 'error',
                message: '上传文件大小必须小于4M'
            })
            return false
        }
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件类型错误,必须上传jpg/png/gif图片'
        })
        return false;
    }
}
//照片墙预览函数
let handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;

    dialogVisible.value = true
}
//移除照片函数
let handleRemove = () => {
    console.log(123);
}

//对比产品全部属性和已展示属性 找出未展示的属性值
let remainSaleAttr = computed(() => {
    let result = allSaleAttr.value.filter((item) => {
        //map方法会返回函数返回值构成的数组
        return spuSaleAttr.value.every((item1) => {
            return item.name != item1.saleAttrName
        });
    })
    return result;
})
//添加属性值方法
let addSaleAttr = () => {
    let [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':');
    let newsSaleAttr: SaleAttrResponseData = {
        saleAttrName,
        baseSaleAttrId,
        spuSaleAttrValueList: []
    }
    spuSaleAttr.value.push(newsSaleAttr);
    saleAttrIdAndName.value = '';

}
//点击添加属性值 切换编辑模式与显示模式
let toEdit = (row: SaleAttrResponseData) => {
    row.flag = true;
}
//将属性值包装添加到数据
let toLook = (row: SaleAttrResponseData) => {
    let { baseSaleAttrId, spuSaleAttrValue } = row;
    let newSaleAttrValue: SpuSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: spuSaleAttrValue as string
    }
    //再对属性值做一些验证 属性值不能为空
    if (!(spuSaleAttrValue as string).trim()) {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    let repeat = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName == spuSaleAttrValue
    })

    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false;
}
//保存数据 发送添加或者修改请求
let save = async () => {
    //对照片墙数据进行加工
    let imgList = spuImgList.value.map((item: any) => {
        return {
            imgName: item.name,//这里存储的是图片的名称
            //要判断是本来就有的图片还是后来添加的
            imgUrl: item.response ? item.response.data : item.url
        }
    })
    //照片墙赋值注意添加属性
    SpuParamsData.value.spuImageList = imgList;

    SpuParamsData.value.spuSaleAttrList = spuSaleAttr.value;
    let result = await reqAddOrUpdate(SpuParamsData.value);
    console.log(result);

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParamsData.value.id ? '修改Spu成功' : '添加Spu成功'
        })
        //修改场景值 返回父组件
        //flag是场景切换变量 params表示是更新还是添加
        $emit('changeScene', { flag: 0, params: SpuParamsData.value.id ? 'update' : 'add' });

    } else {
        ElMessage({
            type: 'error',
            message: SpuParamsData.value.id ? '修改Spu成功' : '添加Spu成功'
        })
    }

}
defineExpose({ initEditSpuData, initAddSpuDate });
</script>
<style lang="sass">
    
</style>