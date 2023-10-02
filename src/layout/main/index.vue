<template>
    <router-view v-slot="{ Component }">
        <Transition name="fade">
            <component :is="Component" v-if="flag"></component>
        </Transition>
    </router-view>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'
let flag = ref(true);
let LayoutSettingStore = useLayoutSettingStore()
watch(() => LayoutSettingStore.refresh, () => {
    flag.value = false;
    //在下次循环DOM节点开始调用函数
    nextTick(() => {
        flag.value = true
    })
})
</script>
<script lang="ts">
export default {
    name: 'Main'
}
</script>
<style>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.8s linear;
}

.fade-enter-to {
    opacity: 1;
}
</style>