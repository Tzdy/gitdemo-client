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
                    <ShareToggleBtn icon="pin" @toggle="onTogglePin" :is-toggle="repoInfo.isOverview" text="Pin"
                        toggle-text="Unpin" />
                    <ShareToggleBtn icon="eye" @toggle="onToggleWatch" :is-toggle="repoInfo.isWatch" text="Watch"
                        toggle-text="Unwatch" />
                    <button @click="onFork" class="btn-sm btn">
                        <BaseSvgIcon name="fork" :size="16" class="octicon mr-2" />
                        <span>Fork</span>
                        <span class="Counter">1</span>
                    </button>
                    <ShareStarToggleBtn :star="repoInfo.isStar" :star-num="repoInfo.starNum" @toggle="onToggleStar" />
                </div>
            </div>
            <!-- navBar -->
            <BaseUnderlineNav :items="navItems" :selected-name="tabName" more-pos="center" />
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@/components/base/BreadCrumb.vue'
import type { UnderlineNavItem } from '@/components/base/UnderlineNav.vue';
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
    isWatch: false,
    isOverview: false,
    starNum: 100,
})
function onTogglePin(val: boolean, done: Function, err: Function) {
    setTimeout(() => {
        done()
    }, 1000)
}
function onToggleWatch() { }
function onFork() { }
function onToggleStar() { }

// navbar
function switchTab(tab: string[] | string | undefined) {
    if (typeof tab === 'string') {
        tabName.value = tab
    } else if (typeof tab === 'undefined') {
        tabName.value = 'code'
    }
}
const tabName = ref('')
switchTab(useRoute().query.tab)
console.log(tabName.value)
useRouter().afterEach((to, from) => {
    if (to.path === from.path) {
        switchTab(to.query.tab)
    }
})
const navItems = reactive<UnderlineNavItem[]>([
    {
        name: 'Code',
        url: `${useRoute().params.reponame as string}`,
        icon: 'code',
    },
    {
        name: 'Issues',
        url: '?tab=issues',
        icon: 'issue',
        number: 18,
    },
    {
        name: 'Pull Request',
        url: '?tab=pull request',
        icon: 'pullrequest',
        number: 0,
    },
])
</script>

<style scoped>
.css-top-header {
    background-color: var(--color-page-header-bg);
    /* BFC */
    display: flow-root;
}
</style>