<template>
    <span class="d-inline-block">
        <span class="repo-language-color mr-1"
            :style="{ backgroundColor: languageColor[language] ? languageColor[language] : languageColor['Other'] }"></span>
        <span>{{ language }}</span>
    </span>
</template>

<script setup lang="ts">
const languageColor: Record<string, string | undefined> = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    TypeScript: '#3178c6',
    Go: '#00ADD8',
    Css: '#563d7c',
    Vue: '#41b883',
    PHP: '#4F5D95',
    Other: "#563d7c",
}
defineProps({
    language: {
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