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
        @import '@primer/css/subhead/index.scss';
        @import '@primer/css/alerts/index.scss';
        @import '@primer/css/avatars/index.scss';
        @import '@primer/css/dropdown/index.scss';
        @import '@primer/css/header/index.scss';
        @import '@primer/css/labels/index.scss';
        @import '@primer/css/loaders/index.scss';
        @import '@primer/css/popover/index.scss';
        @import '@primer/css/timeline/index.scss';
        @import '@primer/css/toasts/index.scss';
        @import '@primer/css/toggle-switch/index.scss';
        @import '@primer/css/select-menu/index.scss';
        @import '@primer/css/marketing/index.scss';
        @import '@primer/css/breadcrumb/index.scss';
        @import '@primer/css/progress/index.scss';
        @import '@primer/css/markdown/index.scss';
    }
}
</style>