<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default defineComponent({

})
</script>

<style lang="scss" scoped>
:deep() {
    & {
        // Global requirements
        @import '@primer/css/core/index.scss';
        @import '@primer/css/product/index.scss';
        @import '@primer/css/marketing/index.scss';
    }
}
</style>