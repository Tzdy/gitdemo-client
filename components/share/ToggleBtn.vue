<template>
    <button @click="onToggle" class="rounded-left-2 btn-sm btn">
        <BaseSvgIcon :name="icon" :size="16" class="octicon mr-2" />
        <span v-show="!isToggle">{{ text }}</span>
        <span v-show="isToggle">{{ toggleText }}</span>
        <span class="Counter" v-show="toggleNumber">{{ toggleNumber }}</span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: {
        type: String,
    },
    text: {
        type: String,
    },
    toggleText: {
        type: String,
    },
    isToggle: {
        type: Boolean
    },
    toggleNum: {
        type: [Number],
    }
})
const emit = defineEmits(['toggle'])
const isToggle = ref(props.isToggle)
const toggleNumber = ref(props.toggleNum)
let running = false
function onToggle() {
    if (running) {
        return;
    }
    running = true
    emit('toggle', !isToggle.value, function () {
        isToggle.value = !isToggle.value
        if (Number.isInteger(toggleNumber.value)) {
            if (isToggle.value) {
                toggleNumber.value++
            } else {
                toggleNumber.value--
            }
        }
        running = false
    }, function () {
        running = false
    })
}
</script>

<style scoped>
</style>