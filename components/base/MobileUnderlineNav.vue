<template>
    <div class="UnderlineNav d-block d-md-none position-sticky top-0 pl-3 ml-n3
          mr-n3 pr-3 color-bg-default" style="z-index:3;">
        <nav class="UnderlineNav-body width-full p-responsive" data-pjax="">
            <span @click="onNavTo(item)" aria-current-value="false" v-for="item in navItems" :key="item.name"
                :class="{ selected: item.selected, }" class="UnderlineNav-item">
                <BaseSvgIcon :name="item.icon" class="octicon UnderlineNav-octicon" :size="16" />
                {{ item.name }}
                <span v-show="item.number" class="Counter">{{ item.number }}</span>
            </span>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { UnderlineNavItem } from './UnderlineNav.vue';

const QUERY_NAME = 'tab'
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

const $router = useRouter()
const username = useRoute().params.username as string
function onNavTo(item: UnderlineNavItem) {
    if (item.replace) {
        if ($router.currentRoute.value.query[QUERY_NAME] === item.query) {
            return;
        }
    }
    const query: Record<string, string> = {}
    if (item.query) {
        query[QUERY_NAME] = item.query
    }
    $router.replace({
        path: username,
        query,
    })
}

watch(toRef(props, 'selectedName'), () => {
    switchTab()
}, {
    immediate: true
})

</script>

<style scoped>

</style>