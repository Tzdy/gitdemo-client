<template>
    <BaseContainer>
        <BaseAlert class="login-box my-3 mx-auto" type="error" exit v-model:alert-text="alertText" />
        <BaseBox spacious class="login-box mx-auto color-bg-subtle">
            <template v-slot:body>
                <BaseForm>
                    <BaseFormItem label="用户名">
                        <BaseInput v-model="username" name="username" class="color-bg-default"></BaseInput>
                    </BaseFormItem>
                    <BaseFormItem label="密码">
                        <BaseInput v-model="password" name="password" class="color-bg-default" type="password">
                        </BaseInput>
                    </BaseFormItem>
                    <BaseFormItem class="mt-4">
                        <BaseButton @click="onLogin" type="primary" size="block">登录</BaseButton>
                    </BaseFormItem>
                </BaseForm>
            </template>
        </BaseBox>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useAuth } from '~~/store/auth';
const authStore = useAuth()

const alertText = ref('')
const username = ref('')
const password = ref('')
async function onLogin() {
    const errMessage = await authStore.login(username.value, password.value)
    if (!errMessage) {
        navigateTo({
            path: `${username.value}`
        })
    } else {
        alertText.value = errMessage
    }
}

</script>

<style scoped>
.login-box {
    width: 340px;
}
</style>