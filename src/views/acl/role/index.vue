<template>
    <!-- 角色搜索框 -->
    <el-card class="box-card">
        <el-form :inline="true" class="user">
            <el-form-item label="职位搜索:">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!--角色表格展示  -->
    <el-card>
        <el-button type="primary" size="default" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0 ;" :data="roleArr">
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配角色</el-button>
                    <el-button type="info" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.roleName}吗?`" @confirm="removeRole(row)" width=250>
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->

        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handler"
            @current-change="getHasRole" />
    </el-card>
    <!-- 添加或者编辑职位dialog对话框 -->
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新用户' : '添加用户'">
        <el-form :rules="rules" :model="roleParams" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请输入职位名称" v-model="roleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉接口：给角色分配权限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单和按钮的权限</h4>
        </template>
        <template #default>
            <!-- 树结构 -->
            <el-tree :data="menuList" show-checkbox node-key="id" default-expand-all :default-checked-keys="initArr"
                :props="defaultProps" ref="tree" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button>取消</el-button>
                <el-button type="primary" @click="confirmPermission">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { reqAllRole, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqRemoveRole } from '@/api/acl/role/index';
import type { Records, RoleDataResponseData, RoleData, MenuList, MenuRoleResponseData } from '@/api/acl/role/type';
import useLayoutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';

let LayoutSettingStore = useLayoutSettingStore()
//存储当前页
let pageNo = ref<number>(1);
//存储一页多少条数据
let pageSize = ref<number>(10);
//搜索关键字
let keyword = ref<string>('');
//存储对应角色数据
let roleArr = ref<Records>([])
//存储数据总数
let total = ref<number>(0);
//控制添加更新用户对话框显示
let dialogVisible = ref<boolean>(false);
//存储角色职位数据
let roleParams = ref<RoleData>({
    roleName: ''
})
//存储form实例
let form = ref<any>();
//存储树的实例
let tree = ref<any>();
//控制分配角色权限抽屉
let drawer = ref<boolean>(false);
//存储菜单权限数据
let menuList = ref<MenuList>([]);
//存储菜单中被选中的权限的id
let initArr = ref<number[]>([])
//获取角色数据
onMounted(() => {
    getHasRole()
})
const getHasRole = async (page = 1) => {
    pageNo.value = page
    let result: RoleDataResponseData = await reqAllRole(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        //存储角色数据
        roleArr.value = result.data.records;
        //存储数据总数
        total.value = result.data.total;
    }
}
//一页数据总数发生变化的回调
const handler = () => {
    getHasRole()
}
//重置数据
const reset = () => {
    //改变刷新值
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
    keyword.value = ''
}
//搜索用户
const search = () => {
    getHasRole();
}
//添加角色回调
const addRole = () => {
    dialogVisible.value = true;
    //清除上次验证信息
    nextTick(() => {
        form.value.clearValidate('roleName')
    })
    //清除上次留下的数据
    Object.assign(roleParams.value, {
        roleName: '',
        id: 0
    })
}
//更新角色职位回调
const updateRole = (row: RoleData) => {
    dialogVisible.value = true;
    //清除上次验证信息
    nextTick(() => {
        form.value.clearValidate('roleName')
    })
    Object.assign(roleParams.value, row);

}
//对话框取消按钮回调
const cancel = () => {
    dialogVisible.value = false;
}
//对话框确定按钮回调
const confirm = async () => {
    await form.value.validate();
    //发送添加或者更新职位请求
    let result: any = await reqAddOrUpdateRole(roleParams.value);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: roleParams.value.id ? '修改用户成功' : '添加用户成功'
        })
        //关闭对话框
        dialogVisible.value = false;
        getHasRole()
    } else {
        ElMessage({
            type: "success",
            message: roleParams.value.id ? '修改用户失败' : '添加用户失败'
        })
    }

}
//表单验证roleName
const validateRoleName = (roles: any, value: any, callback: any) => {
    if (value.trim().length > 2) {
        callback()
    } else {
        callback(new Error('职位名称应该大于2位'))
    }

}
//表单验证
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validateRoleName }
    ]
}

//角色权限树数据
const defaultProps = {
    children: 'children',
    label: 'name',
}

//分配角色权限回调
const setPermission = async (row: RoleData) => {
    drawer.value = true;

    Object.assign(roleParams.value, row)
    //发请求获取角色对应的权限
    let result: MenuRoleResponseData = await reqAllMenuList((roleParams.value.id as number));
    if (result.code == 200) {
        //存储权限菜单数据
        menuList.value = result.data;
        // 对权限菜单进行加工 过滤出被选中的权限
        filterMenuList(menuList.value, initArr.value);

    }
}
//过滤权限菜单
const filterMenuList = (permissionArr: MenuList, initArr: any) => {
    permissionArr.forEach(item => {
        if (item.select && item.level == 4) {
            initArr.push(item.id);
        }
        if (item.children && item.children.length > 0) {
            filterMenuList(item.children, initArr)
        }
    });

}
//权限抽屉修改按钮的回调
const confirmPermission = async () => {
    let roleId = (roleParams.value.id as number);
    //获取选中的权限id
    let arr = tree.value.getCheckedKeys();
    //获取半选中的权限id
    let arr1 = tree.value.getHalfCheckedKeys();
    let arr2 = arr.concat(arr1);

    let result: any = await reqSetPermission(roleId, arr2);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: "分配权限成功"
        })
        getHasRole();
        window.location.reload()
    } else {
        ElMessage({
            type: 'error',
            message: "分配权限失败"
        })
    }

}
//删除职位回调
const removeRole = async (row: RoleData) => {
    let result: any = await reqRemoveRole((row.id as number));

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: "删除职位成功"
        })
        getHasRole(roleArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: "删除职位失败"
        })
    }

}
</script>
<style>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {
    width: 1100px;
    margin: 5px auto;
    height: 80px;
}
</style>