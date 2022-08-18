<template>
    <main>
        <ProductHeader avatar="https://www.tsdy.club/git/manage/user/info/avatar/Tsdy"></ProductHeader>
        <ProductRepoMain v-if="$route.params.type === 'tree'" />
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>