<template>
    <details class="dropdown details-reset details-overlay d-inline-block">
        <summary class="d-inline" aria-haspopup="true">
            <slot></slot>
            <div class="dropdown-caret ml-1"></div>
        </summary>

        <ul class="dropdown-menu dropdown-menu-sw">
            <li v-for="(item, index) in dropdownItems" :class="item.type === 'divider' ? 'dropdown-divider' : ''"
                :key="index">

                <NuxtLink v-if="item.name" class="dropdown-item" href="#url">Dropdown item</NuxtLink>
            </li>
        </ul>
    </details>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface Data {
    name: string;
    url: string;
}
interface Divider {
    type: 'divider',
}
const props = defineProps({
    data: {
        type: Array as PropType<Array<Data | Array<Data>>>,
        default: () => [],
    },
})
const dropdownItems = computed(() => {
    return props.data.reduce<Array<Data | Divider>>((a, b) => {
        if (b instanceof Array) {
            return a.concat({ type: 'divider' }, b)
        } else {
            return a.concat(b)
        }
    }, [])
})
</script>

<style scoped>
</style>