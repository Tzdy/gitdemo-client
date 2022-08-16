<template>
    <!-- 下划线导航 -->
    <div class="UnderlineNav width-full box-shadow-none overflow-md-x-hidden flex-items-center">
        <nav ref="navElement" class="UnderlineNav-body width-full p-responsive" aria-label="User profile">
            <!-- aria-current-value="false" 由于css中可以通过这个属性判断当前处于哪一个tab -->
            <!-- NuxtLink 处理aria-current-value的方法与css，实际情况不符合。所以直接强制为false -->
            <NuxtLink v-for="item in navItems" :key="item.name" aria-current-value="false"
                :style="{ visibility: !item.visible ? 'hidden' : 'visible' }" :class="{ selected: item.selected, }"
                class="UnderlineNav-item" :to="item.url">
                <BaseSvgIcon :name="item.icon" class="octicon UnderlineNav-octicon" :size="16" />
                {{ item.name }}
                <span v-show="item.number" class="Counter">{{ item.number }}</span>
            </NuxtLink>
        </nav>
        <!-- 当屏幕变小后，补充显示。 -->
        <div class="position-absolute pr-3 pr-md-4 pr-lg-5 right-0 js-responsive-underlinenav-overflow"
            :style="{ top: morePos === 'top' ? 0 : 'auto' }">
            <details :hidden="isNavItemsMore" class="details-overlay details-reset position-relative">
                <summary role="button">
                    <div class="UnderlineNav-item mr-0 border-0">
                        <BaseSvgIcon name="kebab" :size="16" class="octicon" />
                        <span class="sr-only">More</span>
                    </div>
                </summary>
                <div>
                    <div role="menu" class="dropdown-menu dropdown-menu-sw">
                        <ul>
                            <li v-for="item in navItems" :hidden="item.visible" :key="item.name">
                                <NuxtLink class="dropdown-item" :to="item.url">{{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </details>
        </div>

    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface UnderlineNavItem {
    name: string
    icon: string
    url: string
    number?: number
}
const navElement = ref<HTMLElement | null>(null)
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
        selected: props.selectedName.toLowerCase() === item.name.toLowerCase() ? true : false,
    })
})
const isNavItemsMore = computed(() => {
    return navItems.every(item => item.visible)
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

onMounted(() => {
    useNavbarResize(navElement, navItems)
})
</script>

<style scoped>
</style>