<template>
    <button class="btn" :class="classProperty" type="submit" aria-label="Copy to clipboard">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { PropType } from "vue";

export default defineComponent({
    props: {
        type: {
            type: String as PropType<'primary' | 'outline' | 'danger'>
        },
        size: {
            type: String as PropType<'block' | 'small' | 'large'>
        }
    },
    setup(props) {
        const classProperty = computed(() => {
            const property: Record<string, boolean> = {}
            if (props.type) {
                property[`btn-${props.type}`] = true
            }
            if (props.size) {
                switch (props.size) {
                    case 'small':
                        property['input-sm'] = true
                        break;
                    case 'large':
                        property['input-lg'] = true
                        break;
                    case 'block':
                        property['input-block'] = true
                        break;
                }
            }
            return property
        })

        return {
            classProperty
        }
    }
})
</script>

<style scoped>
</style>