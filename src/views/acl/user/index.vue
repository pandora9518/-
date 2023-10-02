<template>
    <el-card class="box-card">
        <el-form :inline="true" class="user">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="add" v-has="`btn.Trademark.add`">添加用户</el-button>
        <el-button type="danger" size="default" @click="removeAll"
            :disabled="selectArr.length ? false : true">批量删除</el-button>
        <el-table border style="margin: 10px 0 ;" :data="userArr" @selection-change="selectChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <template #="{ row, $index }">
                    <el-button size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="update(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}吗?`" @confirm="deleteUser(row)" width=250>
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
            @current-change="getHasUser" />

        <!-- 抽屉结构: 完成添加用户|修改用户的账号信息 -->
        <el-drawer v-model="drawer" direction="rtl">
            <!-- 抽屉头部 -->
            <template #header>
                <h4>{{ userHeader }}</h4>
            </template>
            <!-- 抽屉展示区 -->
            <template #default>
                <el-form :model="userParams" :rules="rules" ref="formRef">
                    <el-form-item label="用户姓名" prop="username">
                        <el-input placeholder="请填写用户姓名" v-model="userParams.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="name">
                        <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                        <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                </div>
            </template>
        </el-drawer>
        <!-- 抽屉结构: 用户角色分配与管理 -->
        <el-drawer v-model="drawer1" direction="rtl">
            <template #header>
                <h4>分配角色(职位)</h4>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="用户姓名">
                        <el-input :value="userParams.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="职位列表">
                        <!-- 控制职位全选 -->
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="role in allRole" :key="role" :label="role">{{
                                role.roleName }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="drawer1 = false">取消</el-button>
                    <el-button type="primary" @click="confirmClick">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { reqUserList, reqAddOrUpdateUser, reqRemoveUser, reqAllRole, reqAssignRole, reqDeleteUser } from '@/api/acl/user';
import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, RoleVo } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()
//默认页码
let pageNo = ref<number>(1);
//一页展示多少条数据
let pageSize = ref<number>(5);
//存储全部用户的数组
let userArr = ref<Records>([]);
//存储总用户数
let total = ref<number>(0);
//控制抽屉结构的显示
let drawer = ref<boolean>(false);
//收集用户的信息
let userParams = ref<User>({
    username: '',
    name: '',
    password: ''
})
//存储表单实例
let formRef = ref();
//添加或者修改用户数据的头部
let userHeader = computed(() => userParams.value.id ? '更新用户' : '添加用户');

//存储所有角色职位
let allRole = ref<AllRole>([]);
let userRole = ref<AllRole>([]);
//存储要批量删除中已经选中的数据
let selectArr = ref<number[]>([]);

//存储搜索关键字
let keyword = ref<string>('')
onMounted(() => {
    getHasUser();
})
//获取用户数据
let getHasUser = async (page = 1) => {
    pageNo.value = page
    let result: UserResponseData = await reqUserList(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        userArr.value = result.data.records;
        total.value = result.data.total;
    }

}
//当页面存储的数据大小改变时候触发
let handler = () => {
    getHasUser()
}
//添加用户的回调
let add = () => {
    drawer.value = true;
    Object.assign(userParams.value, {
        username: '',
        name: '',
        password: '',
        id: 0
    })
    //清除上次留下来的验证消息
    nextTick(() => {
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('password');
    })
}
//取消回调
let cancel = () => {
    drawer.value = false
}
//确认添加用户的回调
let save = async () => {
    await formRef.value.validate()
    drawer.value = false;
    //发请求添加或者修改用户
    let result: any = await reqAddOrUpdateUser(userParams.value);
    if (result.code == 200) {
        //提示添加成功
        ElMessage({
            type: 'success',
            message: userParams.value.id ? '更新用户成功' : '添加用户成功'
        })
        //添加成功 更新用户数据
        // getHasUser(userParams.value.id ? pageNo.value : 1); 因为页面必定刷新 会触发重新获取用户信息
        //避免修改当前用户 所以要刷新页面重新获取数据
        window.location.reload();
    } else {
        ElMessage({
            type: 'error',
            message: userParams.value.id ? '更新用户失败' : '添加用户失败'
        })
    }
}
//修改用户的回调
let update = (row: User) => {
    //传递用户数据
    Object.assign(userParams.value, row)
    //换出抽屉
    drawer.value = true;
    //清除上次留下的验证信息 注意放到drawer后面保证组件存在
    nextTick(() => {
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('password');
    })
}
//验证用户名
const validateUsername = (rules: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('用户姓名长度应该大于5位'))
    }
}
//验证用户昵称
const validateName = (rules: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('用户昵称长度应该大于5位'))
    }
}
//验证密码
const validatePassword = (rules: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('用户密码应该大于等于6位'))
    }
}
//抽屉表单验证
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    name: [{ required: true, trigger: 'blur', validator: validateName }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}
//控制角色管理抽屉显示
let drawer1 = ref<boolean>(false);
//分配角色回调
const setRole = async (row: User) => {
    //存储用户数据
    Object.assign(userParams.value, row);

    //获取用户职位数据
    let result: AllRoleResponseData = await reqAllRole((row.id as number));

    if (result.code == 200) {
        //存储所有职位
        allRole.value = result.data.allRolesList;
        //储存当前用户职位
        userRole.value = result.data.assignRoles;
        //控制抽屉显示
        drawer1.value = true;
    }
}
//控制职位全选
let checkAll = ref<boolean>(false);
//控制未确定属性
let isIndeterminate = ref<boolean>(true);
//控制全选按钮
const handleCheckAllChange = (val: boolean) => {

    //判断是否全选赋值已选中的userRole
    userRole.value = val ? allRole.value : [];
    //取消未确定状态
    isIndeterminate.value = false;
}
//选中职位的点击回调
const handleCheckedCitiesChange = (value: string[]) => {
    //这里的默认参数是已经选中的职位数组
    checkAll.value = (value.length === allRole.value.length);
    isIndeterminate.value = (value.length !== allRole.value.length)
}
//角色抽屉确认回调
const confirmClick = async () => {
    //处理data数据
    let data: RoleVo = {
        roleIdList: userRole.value.map((item => item.id)),
        userId: (userParams.value.id as number)
    }
    let result: any = await reqAssignRole(data);

    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: '修改职位成功'
        })
        //关闭抽屉
        drawer1.value = false
        //重新获取数据
        getHasUser()
    }
}
//删除用户回调
const deleteUser = async (row: User) => {
    let result: any = await reqDeleteUser((row.id as number));
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除用户成功'
        })
        //更新数据
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
}
//多选框发生变化时候触发回调
//批量删除用户回调
const selectChange = async (arr: Records) => {
    let select = arr.map((item: any) => {
        return item.id
    })
    selectArr.value = select;
}
//批量删除用户确认回调
const removeAll = async () => {
    let result = await reqRemoveUser(selectArr.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除用户成功'
        })
        //更新数据
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: "删除失败"
        })
    }
}
//搜索按钮回调
const search = () => {
    getHasUser();
    keyword.value = ''
}
//重置按钮的回调
const reset = () => {
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}
</script>
<style>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {

    height: 80px;
}
</style>