<template>
    <div v-show="alertText" class="flash f5" :class="classProperty">
        <button v-if="exit" @click="toggleHandler" class="flash-close js-flash-close">
            <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z">
                </path>
            </svg>
        </button>
        <span v-text="alertText"></span>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default defineComponent({
    props: {
        type: {
            type: String as PropType<'error' | 'success' | 'warn'>,
        },
        exit: {
            type: Boolean,
        },
        alertText: {
            type: String,
        }
    },
    emits: [
        'update:alertText',
        'toggleExit'
    ],
    setup(props, { emit }) {
        const classProperty = computed(() => {
            const property: Record<string, boolean> = {}
            if (props.type) {
                property[`flash-${props.type}`] = true
            }
            return property
        })
        function toggleHandler() {
            emit('update:alertText', '')
            console.log(props.alertText)
            emit('toggleExit')
        }
        return {
            classProperty,
            toggleHandler
        }
    }
})
</script>

<style scoped>

</style>