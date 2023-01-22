<template>
    <nav aria-label="Breadcrumb">
        <ol>
            <li v-for="item in items" :key="item.name" :class="{ 'breadcrumb-item-selected': !!item.selected }"
                class="breadcrumb-item">
                <strong v-if="!!item.strong">
                    <NuxtLink :href="item.url">{{ item.name }}</NuxtLink>
                </strong>
                <NuxtLink v-else :href="item.url">{{ item.name }}</NuxtLink>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface BreadcrumbItem {
    name: string;
    url: string;
    selected: boolean;
    strong: boolean;
}

defineProps({
    items: {
        type: Array as PropType<BreadcrumbItem[]>,
        default: () => [],
    }
})
</script>

<style scoped>
.breadcrumb-item-selected strong a {
    color: var(--color-accent-fg);
}
</style>