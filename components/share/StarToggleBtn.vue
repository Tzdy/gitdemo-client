<template>
    <button @click="onToggle" class="rounded-left-2 btn-sm btn">
        <BaseSvgIcon v-show="!isToggle" name="star" :size="16" class="octicon mr-2" />
        <BaseSvgIcon v-show="isToggle" name="star-fill" color="#eac54f" :size="16" class="octicon mr-2" />
        <span v-show="!isToggle">Star</span>
        <span v-show="isToggle">Starred</span>
        <span class="Counter" v-show="toggleNumber">{{ toggleNumber }}</span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    star: {
        type: Boolean,
    },
    starNum: {
        type: [Number],
    }
})
const emit = defineEmits(['toggle'])
const isToggle = ref(props.star)
const toggleNumber = ref(props.starNum)
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