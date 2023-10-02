<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select placeholder="请输入城市" v-model="categoryStore.c1Id" @change="handler"
                        :disabled="scene == 0 ? false : true">
                        <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                            :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请输入城市" v-model="categoryStore.c2Id" @change="handler1"
                        :disabled="scene == 0 ? false : true">
                        <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                            :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="请输入城市" v-model="categoryStore.c3Id" :disabled="scene == 0 ? false : true">
                        <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                            :value="c3.id"></el-option>

                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script setup lang="ts">
// import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore();
defineProps(['scene'])
//发送获取种类的请求
categoryStore.getC1()

let handler = () => {
    //清除上次遗留的二级数据
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
    //获取二级节点数据
    categoryStore.getC2()
}
//获取三级节点数据
let handler1 = () => {
    //清除上次遗留的二级数据
    categoryStore.c3Id = '';

    categoryStore.getC3()
}
</script>
<style>
.box-card {
    width: 1100px;
    margin: 10px auto;
}
</style>