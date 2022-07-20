<template>
    <BaseContainer>
        <div class="input-group">
            <BaseInput></BaseInput>
            <span class="input-group-button">
                <BaseButton>
                    <ClipSvg></ClipSvg>
                </BaseButton>
            </span>
        </div>
    </BaseContainer>
</template>

<script>
import ClipSvg from '~/assets/svg/clip.svg'
export default {
    components: {
        ClipSvg
    }
};
</script>

<style lang="scss">
</style>