<template>
    <span class="d-inline-block">
        <span class="repo-language-color mr-1"
            :style="{ backgroundColor: color }"></span>
        <span>{{ language }}</span>
    </span>
</template>

<script setup lang="ts">

defineProps({
    language: {
        type: String,
    },
    color: {
        type: String,
    }
})
</script>

<style scoped>
.repo-language-color {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-primer-border-contrast);
    border-radius: 50%;
}
</style>