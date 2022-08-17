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
            <BaseUnderlineNav :items="navItems" :selected-name="tabName" />
        </div>
        <!-- main -->
        <div class="clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
            <div
                class="Layout Layout--flowRow-until-md Layout--sidebarPosition-end Layout--sidebarPosition-flowRow-end">
                <!-- left -->
                <div class="Layout-main">
                    <div class="file-navigation mb-3 d-flex flex-items-start">
                        <BaseSelectBranchMenu :branch-list="repoInfo.branchList" :tag-list="repoInfo.tagList"
                            :select-name="repoInfo.selectName" :select-type="repoInfo.selectType"
                            :default-name="repoInfo.defaultName" :default-type="repoInfo.defaultType" />
                        <div
                            class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                            <NuxtLink :to="`${useRoute().params.reponame}/branches`" class="Link--primary no-underline">
                                <BaseSvgIcon name="branch" :size="16" class="octicon mr-1" />
                                <strong class="mr-1">{{ repoInfo.branchList.length }}</strong>
                                <span class="color-fg-muted">branches</span>
                            </NuxtLink>
                        </div>
                        <div
                            class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                            <NuxtLink :to="`${useRoute().params.reponame}/tags`" class="Link--primary no-underline">
                                <BaseSvgIcon name="tag" :size="16" class="octicon mr-1" />
                                <strong class="mr-1">{{ repoInfo.tagList.length }}</strong>
                                <span class="color-fg-muted">tags</span>
                            </NuxtLink>
                        </div>
                        <div class="flex-auto"></div>

                        <BaseSelectCloneMenu :https-url="repoInfo.httpsUrl" :ssh-url="repoInfo.sshUrl" />
                    </div>
                </div>
                <!-- right -->
                <div class="Layout-sidebar"></div>
            </div>
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
    httpsUrl: 'https://github.com/swc-project/website.git',
    sshUrl: 'git@github.com:swc-project/website.git',
    isStar: false,
    isWatch: false,
    isOverview: false,
    starNum: 100,
    branchList: [
        'master',
        'dev'
    ],
    tagList: [
        'v1',
        'v2',
        'v3'
    ],
    selectType: 'branch' as 'branch' | 'tag',
    selectName: 'master',
    defaultName: 'master',
    defaultType: 'branch' as 'branch' | 'tag',
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