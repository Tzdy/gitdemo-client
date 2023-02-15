<template>
    <details ref="details" class="details-reset details-overlay mr-0 mb-0 ">
        <summary @click="onOpen" class="btn css-truncate">
            <BaseSvgIcon name="branch" :size="16" class="octicon" />
            <span class="css-truncate-target">{{ selectName }}</span>
            <span class="dropdown-caret"></span>
        </summary>
        <div class="SelectMenu">
            <div class="SelectMenu-modal">
                <header class="SelectMenu-header">
                    <span class="SelectMenu-title">Switch branches/tags</span>
                    <button @click="onCloseDetails" class="SelectMenu-closeButton" type="button">
                        <BaseSvgIcon name="close" :size="16" class="octicon" />
                    </button>
                </header>
                <div class="SelectMenu-filter">
                    <input v-model="filterText" placeholder="Find or create a branch…" type="text" autocomplete="off"
                        class="SelectMenu-input form-control">
                </div>
                <div class="SelectMenu-tabs">
                    <button @click="switchTab('branch')" :aria-selected="tabName === 'branch'"
                        class="SelectMenu-tab">Branches</button>
                    <button @click="switchTab('tag')" :aria-selected="tabName === 'tag'"
                        class="SelectMenu-tab">Tags</button>
                </div>
                <div v-show="tabName === 'branch'" class="SelectMenu-list">
                    <a v-for="branch in branchFilter()" :key="branch"
                        :aria-checked="branch === selectName && selectType === 'branch'" class="SelectMenu-item"
                        href="">
                        <BaseSvgIcon name="check" :size="16" class="octicon SelectMenu-icon"
                            :style="{ visibility: branch === selectName && selectType === 'branch' ? 'visible' : 'hidden' }" />
                        <span class="flex-1 css-truncate css-truncate-overflow">
                            <BaseSearchStrongText :text="branch" :strong-text="filterText" />
                        </span>
                        <span class="Label Label--secondary" v-if="branch === defaultName">default</span>
                    </a>
                    <div class="SelectMenu-message" v-show="branchFilter().length === 0">Nothing to show</div>
                </div>
                <div v-show="tabName === 'tag'" class="SelectMenu-list">
                    <a v-for="tag in tagFilter()" :key="tag" :aria-checked="tag === selectName && selectType === 'tag'"
                        class="SelectMenu-item" href="">
                        <BaseSvgIcon name="check" :size="16" class="octicon SelectMenu-icon"
                            :style="{ visibility: tag === selectName && selectType === 'tag' ? 'visible' : 'hidden' }" />
                        <span class="flex-1 css-truncate css-truncate-overflow">
                            <BaseSearchStrongText :text="tag" :strong-text="filterText" />
                        </span>
                    </a>
                    <div class="SelectMenu-message" v-show="tagFilter().length === 0">Nothing to show</div>
                </div>
            </div>
        </div>
    </details>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
const props = defineProps({
    selectType: {
        type: String as PropType<'tag' | 'branch'>,
        required: true,
    },
    selectName: {
        type: String,
        required: true,
    },
    defaultName: {
        type: String,
        required: true,
    },
    branchList: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    tagList: {
        type: Array as PropType<string[]>,
        default: () => []
    }
})
const emit = defineEmits(['switch-tab', 'open'])
const details = ref<HTMLElement | null>(null)
const { close } = useDetailsElement(details)
const tabName = ref<'branch' | 'tag'>('branch')
const filterText = ref('')
function switchTab(tab: 'branch' | 'tag') {
    tabName.value = tab
    emit('switch-tab', tab)
}
function branchFilter() {
    return props.branchList.filter(branch => branch.includes(filterText.value))
}

function tagFilter() {
    return props.tagList.filter(tag => tag.includes(filterText.value))
}

function onOpen() {
    emit('open')
}

function onCloseDetails() {
    close()
}
</script>

<style scoped>

</style>