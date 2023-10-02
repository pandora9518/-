<template>
    <div class="tabber">
        <Breadcrumb></Breadcrumb>
        <Setting></Setting>
    </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
    name: 'Tabber'
}
</script>
<style scoped lang="scss">
.tabber {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabber_left {
        display: flex;
        align-items: center;
        margin-left: 20px;

        .tabber_left_Breadcrumb {
            padding: 0 20px;
        }
    }

    .tabber_right {
        display: flex;
        align-items: center;
    }
}
</style>