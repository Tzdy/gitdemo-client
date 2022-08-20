<template>
    <span class="Progress mb-2">
        <span v-for="item in progress" :key="item.name" :style="progressStyle(item)"
            class="Progress-item color-bg-success-emphasis"></span>
    </span>
    <ul class="list-style-none">
        <li v-for="item in progress" :key="item.name" class="d-inline">
            <NuxtLink :to="join(useRoute().path, `search?l=${item.originName}`)"
                class="d-inline-flex flex-items-center flex-nowrap Link--secondary no-underline text-small mr-3">
                <BaseSvgIcon name="dot" :size="16" :color="item.color" class="octicon mr-2" />
                <span class="color-fg-default text-bold mr-1">{{ item.name }}</span>
                <span>{{ formatPercentage(item.percentage) }}</span>
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { join } from '~~/shared/path';

export interface ProgressItem {
    name: string
    percentage: number
}
const { format } = useLanguage()

const props = defineProps({
    items: {
        type: Array as PropType<ProgressItem[]>,
        default: () => [],
    },
})
const progress = ref(props.items.map(item => {
    return {
        // 搜索用名
        originName: item.name,
        percentage: item.percentage,
        ...format(item.name),
    }
}))
function progressStyle(item: ProgressItem & { color: string }) {
    return {
        backgroundColor: item.color + ' !important',
        width: item.percentage * 100 + '%',
    }
}
function formatPercentage(percentage: number) {
    return (percentage * 100).toFixed(0) + '%'
}
</script>

<style scoped>
</style>