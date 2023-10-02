<template>
    <div class="logo">
        <img src="../../../public/logo.png" alt="">
        <p>{{ logoMsg.title }}</p>
    </div>
</template>
<script setup lang="ts">
import logoMsg from '@/setting'
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 10px;

    img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
    }

    p {
        font-size: $base-logo-title-fontSize;
    }
}
</style>
