<template>
    <div>

        <Category :scene="scene" />
        <el-card class="box-card">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" @click="addAttr"
                    :disabled="CategoryStore.c3Id ? false : true">添加平台属性</el-button>
                <el-table border :data="AttrList">
                    <el-table-column label="序列" type="index" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-tag v-for="attr in row.attrValueList" :key="attr.attrId" type="primary">{{ attr.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Edit" @click="update(row)"></el-button>
                            <el-popconfirm :title="`是否确认删除${row.attrName}`" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene != 0">
                <el-from label-width="auto">
                    <el-form-item label="属性名称" :inline="true">
                        <el-input style="width: 200px;" placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-from>
                <el-button :disabled="attrParams.attrName ? false : true" type="primary" icon="Plus" size="default"
                    @click="addAttrValue">添加属性值</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性值">
                        <template #="{ row, $index }">
                            <el-input v-if="row.flag" :ref="(vc: any) => inputArr[$index] = vc" v-model="row.valueName"
                                @blur="toLook(row, $index)"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="danger" size="small" icon="Delete"
                                @click="attrParams.attrValueList.splice($index, 1)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="confirm">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import { reqAttrValue, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
//引入类型限制 
import { AttrResponseData, AttrResponseList, AttrResponse } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let CategoryStore = useCategoryStore();
//存储属性值
let AttrList = ref<AttrResponseList>([]);
//控制添加和修改模块的切换
let scene = ref<number>(0);
//存储input表单组件实例 
let inputArr = ref<any>([]);
//新增或者修改属性存储 
let attrParams = reactive<AttrResponse>({
    createTime: null,
    updateTime: null,
    attrName: '',
    categoryId: 0,//属于哪一个三级分类
    categoryLevel: 3,//
    attrValueList: []
})
//监视C3Id变化判断请求时间
watch(() => CategoryStore.c3Id, () => {
    AttrList.value = [];
    //当三级分类更新的时候 清除数据
    if (!CategoryStore.c3Id) return;
    getAttr()
})

let getAttr = async () => {
    let { c1Id, c2Id, c3Id } = CategoryStore;
    let result: AttrResponseData = await reqAttrValue(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        AttrList.value = result.data;
    }

}
//添加属性调用函数
let addAttr = () => {
    //首先清空上一次留下的数据
    Object.assign(attrParams, {
        createTime: null,
        updateTime: null,
        attrName: '',
        categoryId: CategoryStore.c3Id,//属于哪一个三级分类
        categoryLevel: 3,//
        attrValueList: []
    })
    scene.value = 1;
}
//修改更新属性
let update = (row: AttrResponse) => {
    //将数据合并 注意这里是Object.assign本身是浅拷贝 需要变成深拷贝 这样处理就换了一个地址
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
    scene.value = 1
}
//添加按钮的回调
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        createTime: null,
        updateTime: null,
        //控制编辑模式和展示模式 true表示编辑模式 false表示展示模式
        flag: true
    })
    nextTick(() => {
        console.log(inputArr.value.length - 1);

        inputArr.value[inputArr.value.length - 1].focus()
    })
}
//确定按钮的回调
const confirm = async () => {
    let result = await reqAddOrUpdateAttr(attrParams);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        //将数据更新
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
    scene.value = 0;
}
//取消按钮的回调
const cancel = () => {
    scene.value = 0
}
//将输入框变为展示模式
const toLook = (row: any, $index: any) => {
    //防止输入为空
    if (row.valueName == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空,请重新输入'
        })
        return;
    }
    //这里方法是防止发生后重复
    let result = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName == row.valueName;
        }
    })
    if (result) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        attrParams.attrValueList.splice($index, 1)
        return;
    }
    row.flag = false
}
//将输入框变为展示模式
const toEdit = (row: any, $index: any) => {
    row.flag = true

    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
//删除属性回调
const deleteAttr = async (id: number) => {
    let result = await reqDeleteAttr(id);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}
//解决路由摧毁清空数据的问题
onBeforeUnmount(() => {
    //这个方法可以清空仓库内所有数据
    CategoryStore.$reset()
})
</script>
<style>
.box-card {
    width: 1100px;
}
</style>