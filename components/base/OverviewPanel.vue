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
            <li ref="overviewsCard" v-for="(item, index) in overviewsList" :key="item.repoName"
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
                                    <span class="repo" :title="item.repoName">{{ item.repoName }}</span>
                                </NuxtLink>
                                <span class="Label Label--secondary v-align-middle mt-1 no-wrap Label--inline">{{
        item.type
}}</span>
                            </div>
                            <span v-show="allowDrag" class="pl-2" title="Drag to reorder"
                                @touchstart.prevent="touchStartHandler($event, index)" @touchmove="touchMoveHandler"
                                @touchend="touchEndHandler" @mousedown="downHandler(index)" style="cursor: grab">
                                <BaseSvgIcon name="drag" :size="16" class="octicon" />
                            </span>
                        </div>

                        <!-- overview card content -->
                        <p class="color-fg-muted text-small mt-2 mb-0">
                            {{ item.about }}
                        </p>
                        <!-- overview card info -->
                        <p class="mb-0 mt-2 f6 color-fg-muted">
                            <BaseLanguage v-if="item.language" class="d-inline-block mr-3" :language="item.language" />

                            <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted">
                                <BaseSvgIcon name="star" :size="16" class="octicon mr-1" />
                                <span>{{ item.starNum }}</span>
                            </NuxtLink>
                            <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="ml-3 Link--muted">
                                <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                                <span>{{ item.forkNum }}</span>
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
                                <span class="repo" :title="mobileDragItem.repoName">{{ mobileDragItem.repoName }}</span>
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
                        {{ mobileDragItem.about }}
                    </p>
                    <!-- overview card info -->
                    <p class="mb-0 mt-2 f6 color-fg-muted">
                        <BaseLanguage v-if="mobileDragItem.language" class="d-inline-block mr-3"
                            :language="mobileDragItem.language" />

                        <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted">
                            <BaseSvgIcon name="star" :size="16" class="octicon mr-1" />
                            <span>{{ mobileDragItem.starNum }}</span>
                        </NuxtLink>
                        <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="ml-3 Link--muted">
                            <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                            <span>{{ mobileDragItem.forkNum }}</span>
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
    id: number;
    repoName: string;
    url: string;
    about: string;
    type: 'Public' | 'Private';
    language: string;
    sortIndex: number;
    starNum: number;
    forkNum: number;
}

const props = defineProps({
    overviews: {
        type: Array as PropType<Array<Overview>>,
        required: true
    },
    allowDrag: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['change'])

const loading = ref(true)
const draggables = reactive([])
let transitioning = false
let dragNowIndex = 0
// 初始化
props.overviews.forEach((v, index) => {
    draggables[index] = false
})

function downHandler(index: number) {
    if (!props.allowDrag) {
        return
    }
    draggables[index] = true
    dragNowIndex = index
}

function dragEndHandler() {
    draggables.forEach((v, index) => {
        draggables[index] = false
    })
    emit('change', [...overviews], [...overviewsList.value])
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


let overviews: Overview[] = []

loading.value = false
const overviewsList = ref<Overview[]>([])

onMounted(() => {
    watch(toRef(props, 'overviews'), () => {
        console.log('change')
        overviews = props.overviews.sort((a, b) => a.sortIndex - b.sortIndex)
        overviewsList.value = overviews.map(item => {
            return {
                ...item
            }
        })
    }, { deep: true, immediate: true })
})

// 移动端兼容拖拽
const mobileDragItem = ref<Overview>({
    id: 0,
    repoName: '',
    url: '',
    about: '',
    type: 'Public',
    language: '',
    sortIndex: 0,
    starNum: 0,
    forkNum: 0
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
    if (!props.allowDrag) {
        return
    }
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
    emit('change', [...overviews], [...overviewsList.value])
}

</script>

<style scoped>
.mobile-drag-item {
    top: 0;
    left: 0;
}

.list-move {
    transition: all 0.5s ease;
    user-select: none;
}
</style>