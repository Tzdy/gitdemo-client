<template>
    <button @click="onToggleStar" class="rounded-left-2 btn-sm btn">
        <BaseSvgIcon v-show="!isStar" name="star" :size="16" class="octicon mr-2" />
        <BaseSvgIcon v-show="isStar" name="star-fill" color="#eac54f" :size="16" class="octicon mr-2" />
        <span v-show="!isStar">Star</span>
        <span v-show="isStar">Starred</span>
        <span class="Counter" v-show="starNumber">{{ starNumber }}</span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    star: {
        type: Boolean,
    },
    starNum: {
        type: [Number, undefined],
    }
})
const emit = defineEmits(['toggle'])
const isStar = ref(props.star)
const starNumber = ref(props.starNum)
function onToggleStar() {
    isStar.value = !isStar.value
    if (Number.isInteger(starNumber.value)) {
        if (isStar.value) {
            starNumber.value++
        } else {
            starNumber.value--
        }
    }
    emit('toggle', isStar.value)
}
</script>

<style scoped>
</style>