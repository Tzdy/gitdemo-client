<template>
    <div class="Box" :class="classProperty">
        <div v-if="$slots.header" class="Box-header">
            <slot name="header"></slot>
        </div>
        <div v-if="$slots.body" class="Box-body">
            <slot name="body"></slot>
        </div>
        <div v-if="$slots.footer" class="Box-footer">
            <slot name="footer"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        spacious: {
            type: Boolean,
        }
    },
    setup(props) {
        const classProperty = computed(() => {
            return {
                "Box--spacious": props.spacious,
            }
        })
        return {
            classProperty
        }
    }
};
</script>

<style lang="scss">
</style>