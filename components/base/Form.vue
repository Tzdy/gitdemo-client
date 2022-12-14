<template>
    <form>
        <slot></slot>
    </form>

</template>

<script lang="ts">
interface Data {
    header: string;
    value: string;
    validator?: RegExp
}

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => [],
        }
    }
});
</script>

<style lang="scss">

</style>