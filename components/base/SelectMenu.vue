<template>
    <details class="details-reset details-overlay" ref="detailElement">
        <summary class="btn" role="button">
            <span>{{ title }}</span>
            <span class="dropdown-caret"></span>
        </summary>
        <div class="SelectMenu right-lg-0" role="menu">
            <div class="SelectMenu-modal">
                <header class="SelectMenu-header">
                    <span class="SelectMenu-title">Select {{ title }}</span>
                    <button @click="onClose" class="SelectMenu-closeButton" type="button">
                        <BaseSvgIcon name="close" :size="16" class="octicon" />
                    </button>
                </header>
                <div class="SelectMenu-list">
                    <label @click="onSelect(item)" v-for="item in items" :key="item" class="SelectMenu-item">
                        <BaseSvgIcon :style="{ visibility: item === selectItem ? 'visible' : 'hidden' }" name="check"
                            :size="16" class="octicon SelectMenu-icon" />
                        <span class="text-normal">{{ item }}</span>
                    </label>

                </div>
            </div>
        </div>
    </details>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    title: {
        type: String,
    },
    items: {
        type: Array as PropType<Array<string>>,
        default: () => [],
    },
    defaultItem: {
        type: String,
    },
})
const emit = defineEmits(['select'])

const selectItem = ref('')
const detailElement = ref<HTMLElement | null>(null)
if (props.defaultItem) {
    selectItem.value = props.defaultItem
}

function closeDetail() {
    detailElement.value.removeAttribute('open')
}

function onSelect(item: string) {
    selectItem.value = item
    emit('select', selectItem.value)
    closeDetail()
}

function onClose() {
    closeDetail()
}


</script>

<style scoped>

</style>