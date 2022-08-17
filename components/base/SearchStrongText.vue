<template>
    <span :style="strongStyle('left')">{{ left }}</span>
    <span :style="strongStyle('middle')">{{ middle }}</span>
    <span :style="strongStyle('right')">{{ right }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
    strongColor: {
        type: String,
        default: '#24292f',
    },
    color: {
        type: String,
        default: '#57606a'
    },
    text: {
        type: String
    },
    strongText: {
        type: String
    }
})
const active = ref<'left' | 'middle' | 'right' | ''>('middle')
const left = ref('')
const middle = ref('')
const right = ref('')
watch(toRef(props, 'strongText'), (val) => {
    console.log(props.text, val)
    if (val && props.text.includes(val)) {
        const index = props.text.indexOf(val)
        console.log(index)
        // left 
        if (index === 0) {
            left.value = val
            middle.value = props.text.slice(index + val.length)
            right.value = ''
            active.value = 'left'
            // right
        } else if (index + val.length === props.text.length) {
            right.value = val
            middle.value = props.text.slice(0, props.text.length - val.length)
            left.value = ''
            active.value = 'right'
            // middle
        } else {
            middle.value = val
            left.value = props.text.slice(0, index)
            right.value = props.text.slice(index + val.length)
            active.value = 'middle'
        }
    } else {
        left.value = ''
        right.value = ''
        middle.value = props.text
        active.value = ''
    }
}, {
    immediate: true,
})
function strongStyle(pos: 'left' | 'middle' | 'right') {
    if (pos === active.value) {
        return {
            color: props.strongColor,
            fontWeight: 600
        }
    } else {
        // 搜索状态
        if (props.strongText && props.text.includes(props.strongText)) {
            return {
                color: props.color
            }
            // 正常状态
        } else {
            return {
                color: 'inherit '
            }
        }
    }
}
</script>

<style scoped>
</style>