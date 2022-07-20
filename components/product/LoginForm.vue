<template>
    <BaseContainer>
        <BaseAlert class="login-box my-3 mx-auto" type="error" exit v-model:alert-text="childAlertText" />
        <BaseBox spacious class="login-box mx-auto color-bg-subtle">
            <template v-slot:body>
                <BaseForm method="post" :action="action">
                    <BaseFormItem label="用户名">
                        <BaseInput name="username" class="color-bg-default"></BaseInput>
                    </BaseFormItem>
                    <BaseFormItem label="密码">
                        <BaseInput name="password" class="color-bg-default" type="password"></BaseInput>
                    </BaseFormItem>
                    <BaseFormItem class="mt-4">
                        <BaseButton type="primary" size="block">登录</BaseButton>
                    </BaseFormItem>
                </BaseForm>
            </template>
        </BaseBox>
    </BaseContainer>
</template>

<script lang="ts">
export default defineComponent({
    props: {
        alertText: {
            type: String,
        },
        action: {
            type: String,
            required: true,
        }
    },
    emits: [
        'update:alertText',
    ],
    setup(props, { emit }) {
        const childAlertText = useCrossComponentModel(toRef(props, 'alertText'), emit, 'update:alertText')
        return {
            childAlertText,
        }
    }
})
</script>

<style scoped>
.login-box {
    width: 340px;
}
</style>