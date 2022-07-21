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
    <TransitionGroup name="list" class="d-flex flex-wrap list-style-none gutter-condensed mb-2" tag="ol">
        <li v-for="(item, index) in overviewsList" :key="item.name" :draggable="draggables[index]" @dragend="dragEnd"
            @dragover="dragOver(index)" @transitionend="transitionend" class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
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
                        <span class="pl-2" title="Drag to reorder">
                            <BaseSvgIcon @pointerdown="down(index)" @mousedown="down(index)" style="cursor: grab" name="drag" :size="16"
                                class="octicon" />
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

function down(index: number) {
    console.log(index)
    draggables[index] = true
    dragNowIndex = index
}

function dragEnd() {
    draggables.forEach((v, index) => {
        draggables[index] = false
    })
}

function dragOver(index: number) {
    if (index !== dragNowIndex && transitioning === false) {
        transitioning = true
        const bak = overviewsList.value[index].sortIndex
        overviewsList.value[index].sortIndex = overviewsList.value[dragNowIndex].sortIndex
        overviewsList.value[dragNowIndex].sortIndex = bak
        overviewsList.value.sort((a, b) => a.sortIndex - b.sortIndex)
        dragNowIndex = index;

    }
}

function transitionend() {
    transitioning = false
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

.list-move {
  transition: all 0.5s ease;
}
</style>