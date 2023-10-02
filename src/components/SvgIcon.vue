<template>
    <div>
        <svg :style="{ width, height }">
            <!-- 引入svg矢量 -->
            <use :xlink:href="prefix + name">
            </use>
        </svg>
    </div>
</template>
<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: {
        type: String,
        default: ''
    },
    width: {
        default: '30px'
    },
    height: {
        default: '40px'
    },
})
</script>
<style></style>