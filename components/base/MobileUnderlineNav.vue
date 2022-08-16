<template>
    <div class="UnderlineNav d-block d-md-none position-sticky top-0 pl-3 ml-n3
          mr-n3 pr-3 color-bg-default" style="z-index:3;">
        <nav class="UnderlineNav-body width-full p-responsive" data-pjax="">
            <NuxtLink aria-current-value="false" v-for="item in navItems" :key="item.name"
                :class="{ selected: item.selected, }" class="UnderlineNav-item" :to="item.url">
                <BaseSvgIcon :name="item.icon" class="octicon UnderlineNav-octicon" :size="16" />
                {{ item.name }}
                <span v-show="item.number" class="Counter">{{ item.number }}</span>
            </NuxtLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { UnderlineNavItem } from './UnderlineNav.vue';

const props = defineProps({
    items: {
        type: Array as PropType<UnderlineNavItem[]>,
        default: () => [],
    },
    selectedName: {
        type: String,
    },
    morePos: {
        type: String as PropType<'top' | 'center' | undefined>,
        default: 'center',
    },
})
const navItems = reactive<(UnderlineNavItem & { selected: boolean, visible: boolean })[]>([])
props.items.forEach((item) => {
    navItems.push({
        ...item,
        visible: true,
        selected: props.selectedName === item.name ? true : false,
    })
})
function switchTab() {
    navItems.forEach(item => {
        if (item.name.toLowerCase() === props.selectedName.toLowerCase()) {
            item.selected = true
        } else {
            item.selected = false
        }
    })
}

watch(toRef(props, 'selectedName'), () => {
    switchTab()
})

</script>

<style scoped>
</style>