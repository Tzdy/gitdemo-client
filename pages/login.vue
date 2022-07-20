<template>
    <ProductLoginForm action="/session" />
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ['auth']
    })
</script>