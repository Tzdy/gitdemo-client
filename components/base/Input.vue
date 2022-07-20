<template>
    <input class="form-control" :class="classProperty" :disabled="disabled" :type="type" :placeholder="placeholder" />
</template>

<script lang="ts">
import { PropType } from "vue";

export default defineComponent({
    props: {
        type: {
            type: String as PropType<'text' | 'password'>,
            default: 'text'
        },
        size: {
            type: String as PropType<'small' | 'large' | 'block' | ''>,
        },
        placeholder: {
            type: String,
        },
        contrast: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        }
    },
    setup(props) {
        const classProperty = computed(() => {
            const res: string[] = []
            switch (props.size) {
                case 'small':
                    res.push('input-sm');
                    break;
                case 'large':
                    res.push('input-lg');
                    break;
                case 'block':
                    res.push('input-block');
                    break;
            }
            if (props.contrast) {
                res.push('input-contrast')
            }
            return res
        })

        return {
            classProperty,
        }
    }
})
</script>

<style lang="scss">

</style>