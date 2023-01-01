<template>
    <details v-if="!!visible" class="details-reset details-overlay details-overlay-dark" ref="details">
        <summary @click="onOpen" class="btn-link Link--muted float-right mt-1 f6">Customize your pins</summary>
        <div class="anim-fade-in fast Box Box--overlay d-flex flex-column details-dialog" style="z-Index: 999">
            <div class="f5 d-flex flex-column overflow-hidden height-full">
                <div class="Box-header">
                    <button @click="offDetailsHandler" class="Box-btn-octicon btn-octicon float-right" type="button">
                        <BaseSvgIcon class="octicon" name="close" :size="16" />
                    </button>
                    <h5 class="color-fg-default">Edit pinned items</h5>
                </div>
                <div class="Box-body border-bottom-0">
                    <p class="color-fg-muted">
                        Select up to six public repositories or gists you'd like to show to anyone.
                    </p>
                    <!-- search -->
                    <div class="d-flex flex-column flex-lg-row flex-auto position-relative">
                        <div class="mb-1 mb-lg-0 mr-lg-1 flex-auto">
                            <input v-model="searchText" type="search" class="search-input form-control width-full"
                                placeholder="Filter repositories" autocomplete="off" spellcheck="false">
                            <BaseSvgIcon class="search-icon octicon" name="search" :size="16" />
                        </div>
                    </div>
                </div>
                <!-- 设置overview的checkbox -->
                <div class="Box-body overflow-auto border-top">
                    <div class="mb-3">
                        <ul class="mb-2 list-style-none position-relative">
                            <li v-for="item in repositoriesSearchResult" :key="item.repoName">
                                <label class="d-inline-block width-full pinned-item" title="Tsdy-module">
                                    <input :disabled="overviewDisabled && item.sortIndex === 0"
                                        :checked="item.sortIndex !== 0" @change="onToggleOverview(item)" type="checkbox"
                                        class="f5 m-2 v-align-middle">
                                    <BaseSvgIcon class="octicon v-align-middle" name="repository" :size="16" />
                                    <strong style="max-width: 65%"
                                        class="ml-1 d-inline-block overflow-hidden ellipsis v-align-middle">
                                        {{ item.repoName }}
                                    </strong>
                                    <span class="no-wrap color-fg-muted float-right" style="line-height: 29px">
                                        <span>{{ item.starNum }}</span>
                                        <BaseSvgIcon class="octicon" name="star" :size="16" />
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="Box-footer text-right border-top-0">
                    <span class="float-left text-small pt-3 lh-condensed-ultra color-fg-danger">{{ remaining
}}
                        remaining</span>
                    <button @click="onSubmit" type="submit" class="btn btn-primary">
                        Save pins
                    </button>
                </div>
            </div>
        </div>
    </details>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Overview } from './OverviewPanel.vue';

const MAX_SELECT_NUM = 6

const props = defineProps({
    visible: {
        type: Boolean,
        default: true,
    },
    repoList: {
        type: Array as PropType<Overview[]>,
        default: () => [],
    }
})


const emit = defineEmits(['close', 'open', 'submit'])

const details = ref<HTMLElement | null>(null)
function offDetailsHandler() {
    details.value && details.value.removeAttribute('open')
    emit('close')
}

function onOpen() {
    emit('open')
}
const repoList = ref<Overview[]>([])
// 备份一份，提交时需要diff
let oldRepoList: Overview[] = []
const repositoriesSearchResult = computed(() => {
    return repoList.value.filter(item => {
        if (item.repoName.includes(searchText.value)) {
            return true
        } else {
            return false
        }
    })
})
const searchText = ref('')
const overviewDisabled = ref(false)
const remaining = ref(6)

watch(toRef(props, 'repoList'), () => {
    repoList.value = props.repoList
    oldRepoList = JSON.parse(JSON.stringify(repoList.value))
}, {
    immediate: true,
})



function calcRemine() {
    remaining.value = 0
    overviewDisabled.value = false
    let selectNum = 0
    repoList.value.forEach(item => {
        if (item.sortIndex !== 0) {
            selectNum++
        }
    })
    remaining.value = MAX_SELECT_NUM - selectNum
    if (selectNum === MAX_SELECT_NUM) {
        overviewDisabled.value = true
    }
}
calcRemine()
function onToggleOverview(item: Overview) {
    let max = 0
    repoList.value.forEach((it => {
        if (it.sortIndex !== 0 && it.sortIndex > max) {
            max = it.sortIndex
        }
    }))
    if (item.sortIndex === 0) {
        item.sortIndex = max + 1
    } else {
        item.sortIndex = 0
        if (item.sortIndex !== max) {
            let index = 1
            repoList.value.forEach(it => {
                if (it.sortIndex !== 0) {
                    it.sortIndex = index
                    index++
                }
            })
        }
    }
    calcRemine()
}

function onSubmit() {
    emit('submit', JSON.parse(JSON.stringify(oldRepoList)), JSON.parse(JSON.stringify(repoList.value)), offDetailsHandler)
}

</script>

<style scoped>
.details-dialog {
    position: fixed;
    top: 50%;
    z-index: 111;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    max-height: 80vh;
    max-width: 448px;
    min-width: 300px;
    width: 80%;
}

.search-input {
    padding-left: 32px;
}

.search-icon {
    position: absolute;
    left: 8px;
    top: 8px;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pinned-item:hover {
    background-color: rgba(208, 215, 222, 0.32);
}
</style>