<template>
    <div class="input-group">
        <input @click="onSelectInput($event)" :value="copyText" readonly type="text"
            class="form-control input-monospace input-sm color-bg-subtle">
        <div class="input-group-button">
            <button @click="onToggle" :aria-label="toggleAriaLabel" :class="toggleClass"
                class="btn btn-sm js-clipboard-copy tooltipped-no-delay">
                <BaseSvgIcon v-show="!isToggle" name="copy" :size="16" class="octicon" />
                <BaseSvgIcon v-show="isToggle" name="check" :size="16" class="octicon color-fg-success" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    copyText: {
        type: String,
    }
})
const isToggle = ref(false)
const toggleClass = computed(() => {
    if (isToggle.value) {
        return {
            "tooltipped": true,
            "tooltipped-n": true,
            "ClipboardButton--success": true,
        }
    } else {
        return {
        }
    }
})

const toggleAriaLabel = computed(() => {
    if (isToggle.value) {
        return 'Copied'
    } else {
        return 'Copy to clipboard'
    }
})
let running = false
function onToggle() {
    if (running) {
        return;
    }
    running = true
    isToggle.value = true
    if ('clipboard' in navigator) {
        navigator.clipboard.writeText(props.copyText);
    }
    setTimeout(() => {
        isToggle.value = false
        running = false
    }, 1800)
}
function onSelectInput(e: Event) {
    (e.target as HTMLInputElement).select()
}
</script>

<style scoped>
.ClipboardButton--success {
    border: 1px solid var(--color-success-emphasis) !important
}
</style>