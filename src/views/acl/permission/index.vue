<template>
    <!-- 表格组件 菜单权限管理 -->
    <el-table :data="permissionArr" row-key="id" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
            <template #="{ row, $index }">
                <el-button type="primary" size="small" @click="addPermission(row)"
                    :disabled="row.level == 4 ? true : false">{{ row.level == 3 ? '添加功能' :
                        '添加菜单'
                    }}</el-button>
                <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false"
                    @click="updatePermission(row)">编辑</el-button>
                <el-popconfirm :title="`你确定要删除${row.name}吗?`" @confirm="removePermission(row)" width=250>
                    <template #reference>
                        <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 对话框组件：添加或者修改菜单权限 -->
    <el-dialog v-model="dialogMenu" title="添加用户">
        <template #default>
            <el-form>
                <el-form-item label="名称">
                    <el-input placeholder="请你输入菜单名称" v-model="menuParams.name"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input placeholder="请你输入权限数值" v-model="menuParams.code"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button size="default">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>

    </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqAddOrUpdatePermission, reqGetPermission, reqRemoveMenu } from '@/api/acl/menu/index';
import { PermissionResponseData, PermissionList, PermissionRole, MenuPermission } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';

//存储菜单权限数据
let permissionArr = ref<PermissionList>([]);
//控制添加或编辑菜单参数
let dialogMenu = ref<boolean>(false);
//存储添加或修改菜单的参数
let menuParams = reactive<MenuPermission>({
    "code": '',
    "level": 0,
    "name": '',
    "pid": 0,
})
onMounted(() => {
    getHasPermission()
})
//获取权限菜单回调
const getHasPermission = async () => {
    let result: PermissionResponseData = await reqGetPermission();
    if (result.code == 200) {
        permissionArr.value = result.data;
    }
}
//添加菜单权限回调
const addPermission = (row: PermissionRole) => {
    dialogMenu.value = true;
    //重置上一次留下的数据
    Object.assign(menuParams, {
        id: 0,
        "code": '',
        "level": 0,
        "name": '',
        "pid": 0,
    })
    //收集新增菜单的level数值
    menuParams.level = row.level + 1;
    //收集新增菜单的pid数值
    menuParams.pid = row.id;
}
//添加菜单权限回调
const updatePermission = (row: PermissionRole) => {
    dialogMenu.value = true;
    //存储收集到的上一个菜单的值
    Object.assign(menuParams, row)
}
//添加或修改 对话框确定按钮的回调
const confirm = async () => {
    let result: any = await reqAddOrUpdatePermission(menuParams);
    if (result.code == 200) {
        //消息提示
        ElMessage({
            type: 'success',
            message: menuParams.id ? '修改成功' : '添加成功'
        })
        //关闭对话框
        dialogMenu.value = false
        //重新获取数据
        getHasPermission()
    } else {
        ElMessage({
            type: 'error',
            message: menuParams.id ? '修改失败' : '添加失败'
        })
    }

}
//移除菜单对应的选项
const removePermission = async (row: PermissionRole) => {
    let result: any = await reqRemoveMenu(row.id);
    if (result.code == 200) {
        //消息提示
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        //重新获取数据
        getHasPermission()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}
</script>
<style></style>