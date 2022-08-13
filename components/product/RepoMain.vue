<template>
    <BaseContainer>
        <!-- top header -->
        <div class="css-top-header pt-3 hide-full-screen">
            <div class="d-flex flex-wrap flex-justify-end mb-3 px-3 px-md-4 px-lg-5">
                <div class="flex-auto min-width-0 width-fit mr-3">
                    <div class="d-flex flex-wrap flex-items-center wb-break-word f3 text-normal">
                        <BaseSvgIcon name="repository" :size="16" class="octicon color-fg-muted mr-2" />
                        <BaseBreadCrumb :items="breadcrumbItems" class="mr-2" />
                        <span class="Label Label--secondary v-align-middle mr-1">{{ repoInfo.type }}</span>
                    </div>
                </div>
                <!-- PC -->
                <!-- pin watch fork star Btn -->
                <div class="flex-shrink-0 d-none d-md-flex" style="gap: 8px">
                    <button class="btn-sm btn">
                        <BaseSvgIcon name="pin" :size="16" class="octicon mr-2" />
                        <span>Pin</span>
                    </button>
                    <button class="btn-sm btn">
                        <BaseSvgIcon name="eye" :size="16" class="octicon mr-2" />
                        <span>Watch</span>
                        <span class="Counter">1</span>
                    </button>
                    <button class="btn-sm btn">
                        <BaseSvgIcon name="pin" :size="16" class="octicon mr-2" />
                        <span>Fork</span>
                        <span class="Counter">1</span>
                    </button>
                    <ShareStarToggleBtn :star="repoInfo.isStar" :star-num="repoInfo.starNum" @toggle="onToggleStar" />
                </div>
            </div>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@/components/base/BreadCrumb.vue'
const breadcrumbItems = reactive<BreadcrumbItem[]>([
    {
        name: 'Tsdy',
        url: '/Tsdy',
        selected: false,
        strong: false,
    },
    {
        name: 'Tsdy-Module',
        url: '/Tsdy/Tsdy-Module',
        selected: true,
        strong: true,
    }
])
const repoInfo = ref({
    type: 'Public',
    isStar: false,
    starNum: 100,
})
function onToggleStar() { }
</script>

<style scoped>
.css-top-header {
    background-color: var(--color-page-header-bg);
    /* BFC */
    display: flow-root;
}
</style>