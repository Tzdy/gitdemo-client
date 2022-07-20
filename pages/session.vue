<template>
    <ProductLoginForm v-model:alert-text="alertText" action="/session" />
</template>

<script setup lang="ts">
import { useBody } from 'h3'
const alertText = ref('')
useFetch
const { data: res } = await useAsyncData('fetch', async () => {
    const event = useRequestEvent()
    const body = await useBody(event)
    const res = await $fetch<any>('http://localhost:20001/auth/login', {
        method: 'post',
        body,
    })
    return {
        ...res,
        username: body.username
    }
})
const { code, data, username } = res.value
if (res.value.code === 20000) {
    const token = useCookie('token')
    token.value = res.value.data.token
    await navigateTo(`/${username}`)
} else {
    alertText.value = res.value.message
}

</script>

<style scoped>
</style>
