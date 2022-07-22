<template>
    <!-- loading -->
    <h2 class="f4 mb-2 text-normal">
        Pinned
        <BaseSvgIcon v-show="loading" name="loading" :size="16"
            style="box-sizing: content-box; color: var(--color-icon-primary);"
            class="spinner v-align-text-bottom ml-1 anim-rotate" />
        <span class="ml-2 color-fg-muted f6 js-pinned-items-reorder-message" role="status" aria-live="polite"
            data-error-text="Something went wrong." data-success-text="Order updated."></span>
    </h2>
    <!-- overview Box -->
    <ol class="d-flex flex-wrap list-style-none gutter-condensed position-relative mb-2">
        <TransitionGroup name="list">
            <li ref="overviewsCard" v-for="(item, index) in overviewsList" :key="item.name"
                :draggable="draggables[index]" @dragend="dragEndHandler" @dragover="dragOverhandler(index)"
                @transitionend="transitionendHandler"
                class="overviews-card mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
                <div class="Box d-flex p-3 width-full">
                    <div class="width-full">
                        <!-- overview card header -->
                        <div class="d-flex width-full position-relative">
                            <div class="flex-1">
                                <BaseSvgIcon name="repository" :size="16" class="octicon mr-2 color-fg-muted" />
                                <NuxtLink class="mr-2 text-bold wb-break-word" :to="item.url">
                                    <span class="repo" :title="item.name">{{ item.name }}</span>
                                </NuxtLink>
                                <span class="Label Label--secondary v-align-middle mt-1 no-wrap Label--inline">{{
                                        item.type
                                }}</span>
                            </div>
                            <span class="pl-2" title="Drag to reorder"
                                @touchstart.prevent="touchStartHandler($event, index)" @touchmove="touchMoveHandler"
                                @touchend="touchEndHandler" @mousedown="downHandler(index)" style="cursor: grab">
                                <BaseSvgIcon name="drag" :size="16" class="octicon" />
                            </span>
                        </div>

                        <!-- overview card content -->
                        <p class="color-fg-muted text-small mt-2 mb-0">
                            {{ item.introduce }}
                        </p>
                        <!-- overview card info -->
                        <p class="mb-0 mt-2 f6 color-fg-muted">
                            <span class="d-inline-block mr-3">
                                <span class="repo-language-color mr-1" v-show="languageColor[item.language]"
                                    :style="{ backgroundColor: languageColor[item.language] }"></span>
                                <span>{{ item.language }}</span>
                            </span>

                            <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted">
                                <BaseSvgIcon name="stars" :size="16" class="octicon mr-1" />
                                <span>{{ item.starsNum }}</span>
                            </NuxtLink>
                            <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="ml-3 Link--muted">
                                <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                                <span>{{ item.forksNum }}</span>
                            </NuxtLink>
                        </p>
                    </div>
                </div>
            </li>
        </TransitionGroup>
        <li class="mobile-drag-item mb-3 d-flex d-md-none flex-content-stretch col-12 col-md-6 col-lg-6 position-absolute"
            :style="mobileDragItemStyle">

            <div class="Box d-flex p-3 width-full">
                <div class="width-full">
                    <!-- overview card header -->
                    <div class="d-flex width-full position-relative">
                        <div class="flex-1">
                            <BaseSvgIcon name="repository" :size="16" class="octicon mr-2 color-fg-muted" />
                            <NuxtLink class="mr-2 text-bold wb-break-word" :to="mobileDragItem.url">
                                <span class="repo" :title="mobileDragItem.name">{{ mobileDragItem.name }}</span>
                            </NuxtLink>
                            <span class="Label Label--secondary v-align-middle mt-1 no-wrap Label--inline">{{
                                    mobileDragItem.type
                            }}</span>
                        </div>
                        <span class="pl-2" title="Drag to reorder">
                            <BaseSvgIcon style="cursor: grab" name="drag" :size="16" class="octicon" />
                        </span>
                    </div>

                    <!-- overview card content -->
                    <p class="color-fg-muted text-small mt-2 mb-0">
                        {{ mobileDragItem.introduce }}
                    </p>
                    <!-- overview card info -->
                    <p class="mb-0 mt-2 f6 color-fg-muted">
                        <span class="d-inline-block mr-3">
                            <span class="repo-language-color mr-1" v-show="languageColor[mobileDragItem.language]"
                                :style="{ backgroundColor: languageColor[mobileDragItem.language] }"></span>
                            <span>{{ mobileDragItem.language }}</span>
                        </span>

                        <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted">
                            <BaseSvgIcon name="stars" :size="16" class="octicon mr-1" />
                            <span>{{ mobileDragItem.starsNum }}</span>
                        </NuxtLink>
                        <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="ml-3 Link--muted">
                            <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                            <span>{{ mobileDragItem.forksNum }}</span>
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </li>
    </ol>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface Overview {
    name: string;
    introduce: string;
    url: string;
    type: 'public' | 'private';
    language: string;
    sortIndex: number;
    starsNum: number;
    forksNum: number;
}

const props = defineProps({
    overviews: {
        type: Array as PropType<Array<Overview>>,
        required: true
    }
})
const loading = ref(true)
const draggables = reactive([])
let transitioning = false
let dragNowIndex = 0
// 初始化
props.overviews.forEach((v, index) => {
    draggables[index] = false
})

function downHandler(index: number) {
    draggables[index] = true
    dragNowIndex = index
}

function dragEndHandler() {
    draggables.forEach((v, index) => {
        draggables[index] = false
    })
}

function dragOverhandler(index: number) {
    if (index !== dragNowIndex && transitioning === false) {
        transitioning = true
        const bak = overviewsList.value[index].sortIndex
        overviewsList.value[index].sortIndex = overviewsList.value[dragNowIndex].sortIndex
        overviewsList.value[dragNowIndex].sortIndex = bak
        overviewsList.value.sort((a, b) => a.sortIndex - b.sortIndex)
        dragNowIndex = index;

    }
}

function transitionendHandler() {
    transitioning = false
    // 移动端 overviewsCard的顺序改变，位置信息也要重新计算。
    resetOverviewsPos()
}


const overviews = toRef(props, 'overviews')


const languageColor: Record<string, string | undefined> = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    TypeScript: '#3178c6',
    Go: '#00ADD8',
    Css: '#563d7c',
    Vue: '#41b883',
    PHP: '#4F5D95',
}
loading.value = false
const overviewsList = ref([])

onMounted(() => {
    watch(overviews, () => {
        console.log('change')
        overviews.value.sort((a, b) => a.sortIndex - b.sortIndex)
        overviewsList.value = toRaw(overviews).value.map(item => {
            return {
                ...item
            }
        })
    }, { deep: true, immediate: true })
})

// 移动端兼容拖拽
const mobileDragItem = ref<Overview>({
    name: '',
    introduce: '',
    url: '',
    type: 'public',
    language: '',
    sortIndex: 0,
    starsNum: 0,
    forksNum: 0
})

const mobileDragItemX = ref(0)
const mobileDragItemY = ref(0)
const isDrag = ref(false)
const overviewsCard = ref<HTMLElement[] | HTMLElement>(null)

let overviewsPos: DOMRect[] = []
let dx = 0
let dy = 0
let originX = mobileDragItemX.value
let originY = mobileDragItemY.value
const mobileDragItemStyle = computed(() => {
    return {
        transform: `translate(${mobileDragItemX.value}px, ${mobileDragItemY.value}px)`,
        display: isDrag.value ? '' : 'none !important'
    }
})

function resetOverviewsPos() {
    if (overviewsCard.value instanceof Array) {
        overviewsPos = overviewsCard.value.map(ele => {
            return ele.getBoundingClientRect()
        })

    } else {
        const ele = overviewsCard.value
        ele.getBoundingClientRect()
        overviewsPos = [ele.getBoundingClientRect()]
    }
}

function touchStartHandler(event: TouchEvent, index: number) {
    dragNowIndex = index
    const target = (event.target as HTMLElement).closest('.overviews-card') as HTMLElement
    const touch = event.touches[0]
    isDrag.value = true
    mobileDragItem.value = overviewsList.value[index]
    mobileDragItemX.value = target.offsetLeft
    mobileDragItemY.value = target.offsetTop
    originX = mobileDragItemX.value
    originY = mobileDragItemY.value
    dx = touch.pageX
    dy = touch.pageY
    resetOverviewsPos()
}

function touchMoveHandler(event: TouchEvent) {
    const touch = event.touches[0]
    mobileDragItemX.value = originX + (touch.pageX - dx)
    mobileDragItemY.value = originY + (touch.pageY - dy)
    overviewsPos.forEach((pos, index) => {
        const { x, y, width, height } = pos
        if (touch.clientY >= y && touch.clientY <= y + height && index !== dragNowIndex) {
            const bak = overviewsList.value[index].sortIndex
            overviewsList.value[index].sortIndex = overviewsList.value[dragNowIndex].sortIndex
            overviewsList.value[dragNowIndex].sortIndex = bak
            overviewsList.value.sort((a, b) => a.sortIndex - b.sortIndex)

            // 多个元素添加属性ref, 获取的是 Array<HTMLElement>，元素如果顺序发生变化，Array<HTMLElement>的顺序不会变
            const bak2 = overviewsCard.value[index]
            overviewsCard.value[index] = overviewsCard.value[dragNowIndex]
            overviewsCard.value[dragNowIndex] = bak2
            dragNowIndex = index;
        }
    })
}

function touchEndHandler() {
    isDrag.value = false
}

</script>

<style scoped>
.repo-language-color {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-primer-border-contrast);
    border-radius: 50%;
}

.mobile-drag-item {
    top: 0;
    left: 0;
}

.list-move {
    transition: all 0.5s ease;
    user-select: none;
}
</style>