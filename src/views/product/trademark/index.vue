<template>
    <div>
        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFlag" :title="tradeMarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;" :model="tradeMarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="tradeMarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img v-if="tradeMarkParams.logoUrl" :src="tradeMarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="info" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
        <!-- 卡片组件 -->
        <el-card class="box-card">
            <template #header>
                <el-button type="primary" icon="Plus" @click="addDialog">添加内容</el-button>
            </template>
            <el-table border :data="trademark">
                <el-table-column label="序号" align="center" width="120" type="index"></el-table-column>
                <el-table-column label="品牌名称" prop="tmName"></el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="图片不存在" style="width: 100px;height: 100px;display: block;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Edit" @click="changeDialog(row)"></el-button>
                        <el-popconfirm title="你确定要删除商品吗?" width="220" icon="Delete" @confirm="removeTrademark(row.id)">

                            <template #reference>
                                <el-button type="primary" size="default" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :small="false"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" style="margin-left: 20px;"
            @current-change="getTrademark" @size-change="getTrademark" />
    </div>
</template>
<script setup lang="ts">
import { ElMessage, type UploadProps } from 'element-plus'
import { ref } from 'vue'
import { onMounted, reactive } from 'vue';
//引入trdemark类型限制 
import type { tradeMarkResponseData, records, tradeMarkParams } from '@/api/product/trademark/type'
//引入获取商品的请求函数
import { reqTradeMark, reqUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let trademark = ref<records>([]);
let total = ref<number>(10);
//获取表单组件实例
let formRef = ref()


//上传logo商标的参数
let tradeMarkParams = reactive<tradeMarkParams>({
    tmName: '',
    logoUrl: ''
})
//控制对话框存在
let dialogFlag = ref(false)
let getTrademark = async (pageNum = 1) => {
    pageNo.value = pageNum
    let result: tradeMarkResponseData = await reqTradeMark(pageNo.value, limit.value);
    trademark.value = result.data.records;
    total.value = result.data.total;
}
onMounted(async () => {
    let result: tradeMarkResponseData = await reqTradeMark(pageNo.value, limit.value);
    trademark.value = result.data.records;
    total.value = result.data.total;
})

//发送修改商品数量的请求
let updateTrademark = async () => {
    let result: any = await reqUpdateTrademark(tradeMarkParams);

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: tradeMarkParams.id ? '修改成功' : '添加成功'
        })
        getTrademark()
    } else {
        ElMessage({
            type: 'error',
            message: tradeMarkParams.id ? '修改失败' : '添加失败'
        })
    }

}
//唤出对话框方法
let addDialog = () => {
    dialogFlag.value = true
    tradeMarkParams.logoUrl = "";
    tradeMarkParams.tmName = "";
    tradeMarkParams.id = 0;
}
//修改对话框方法
let changeDialog = (row: any) => {
    dialogFlag.value = true
    Object.assign(tradeMarkParams, row);

}
//取消对话框
const cancel = () => {
    dialogFlag.value = false
}
//确定对话框
const confirm = async () => {
    await formRef.value.validate()
    dialogFlag.value = false;
    updateTrademark();

}
//传递logo成功之后调用
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //清除图片校验信息
    formRef.value.clearValidate('logoUrl')
    tradeMarkParams.logoUrl = response.data;

}
//传递logo之前调用 可以对文件的格式和大小做出限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {

    if ((rawFile.type == "image/jpeg" || "image/png" || "image/gif")
        && rawFile.size / 1024 / 1024 < 4) {
        ElMessage({
            type: 'success',
            message: '上传成功',

        })
        return true
    } else {
        ElMessage({
            type: 'error',
            message: '上传失败'
        })
    }
}
//商品管理表单tmname校验调用方法
const validateTmName = (rules: any, value: any, callback: any) => {

    if (value.trim().length >= 2) {
        callback();
    } else {
        callback(new Error('品牌名称必须大于2'));
    }
}
const validateLogoUrl = (rules: any, value: any, callback: any) => {
    if (value != '') {
        callback();
    } else {
        callback(new Error('品牌Logo获取失败'));
    }

}
//对话框表单验证规则
const rules = {
    tmName: [
        { require: true, trigger: 'blur', validator: validateTmName }
    ],
    logoUrl: [
        { require: true, validator: validateLogoUrl }
    ]
}
//移除商品的回调
const removeTrademark = async (id: number) => {
    let result = await reqDeleteTrademark(id)
    if (result == 200) {
        //表示删除数据成功
        getTrademark(trademark.value.length > 1 ? pageNo.value : pageNo.value - 1);
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.box-card {
    width: 1100px;
    margin: 10px auto;

}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>