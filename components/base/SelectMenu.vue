<template>
    <details class="details-reset details-overlay position-relative" ref="detailElement">
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
                    <label @click="onSelect(index)" v-for="item, index in items" :key="item.name"
                        class="SelectMenu-item">
                        <BaseSvgIcon :style="{ visibility: index === selectIndex ? 'visible' : 'hidden' }" name="check"
                            :size="16" class="octicon SelectMenu-icon" />
                        <span class="text-normal">{{ item.name }}</span>
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
        type: Array as PropType<Array<{ name: string, value: any }>>,
        default: () => [],
    },
    defaultIndex: {
        type: Number,
        default: 0
    },
})
const emit = defineEmits(['select'])

const selectIndex = ref(props.defaultIndex)
const detailElement = ref<HTMLElement | null>(null)


function closeDetail() {
    detailElement.value && detailElement.value.removeAttribute('open')
}

function onSelect(index: number) {
    selectIndex.value = index
    emit('select', props.items[index])
    closeDetail()
}

function onClose() {
    closeDetail()
}


</script>

<style scoped>

</style>