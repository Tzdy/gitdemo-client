<template>
    <div class="UnderlineNav my-2 box-shadow-none">
        <nav ref="navElement" class="UnderlineNav-body width-full" aria-label="User profile">
            <div v-for="item in items" :key="item" @click="onSwitchTab(item)" role="tab"
                :aria-selected="isSelected(item)" class="UnderlineNav-item">
                {{ item }}
            </div>
        </nav>
    </div>
    <div v-for="item in items" :key="item" v-show="item === tabName">
        <slot :name="item"></slot>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const navElement = ref<HTMLElement | null>(null)
const props = defineProps({
    items: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    selectedName: {
        type: String,
    },
})
const emit = defineEmits(['select'])
const tabName = ref(props.selectedName)
function isSelected(name: string) {
    return name === tabName.value
}
function onSwitchTab(name: string) {
    tabName.value = name
    emit('select', name)
}
</script>

<style scoped>
</style>