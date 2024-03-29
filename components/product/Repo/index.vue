<template>
    <BaseContainer>
        <!-- top header -->
        <div class="css-top-header pt-3 hide-full-screen">
            <div class="d-flex flex-wrap flex-justify-end mb-3 px-3 px-md-4 px-lg-5">
                <div class="flex-auto min-width-0 width-fit mr-3">
                    <div class="d-flex flex-wrap flex-items-center wb-break-word f3 text-normal">
                        <BaseSvgIcon name="repository" :size="16" class="octicon color-fg-muted mr-2" />
                        <BaseBreadCrumb :items="breadcrumbItems" class="mr-2" />
                        <span v-if="repoInfo" class="Label Label--secondary v-align-middle mr-1">{{
                            formatRepoType(repoInfo.type)
                        }}</span>
                    </div>
                </div>
                <!-- PC -->
                <!-- pin watch fork star Btn -->
                <div v-if="repoInfo" class="flex-shrink-0 d-none d-md-flex" style="gap: 8px">
                    <ShareToggleBtn icon="pin" @toggle="onTogglePin" :is-toggle="!!repoInfo.isOverview" text="Pin"
                        toggle-text="Unpin" />
                    <ShareToggleBtn :toggle-num="1" icon="eye" @toggle="onToggleWatch" :is-toggle="true" text="Watch"
                        toggle-text="Unwatch" />
                    <button @click="onFork" class="btn-sm btn">
                        <BaseSvgIcon name="fork" :size="16" class="octicon mr-2" />
                        <span>Fork</span>
                        <span class="Counter">{{ 1 }}</span>
                    </button>
                    <ShareStarToggleBtn :star="!!repoInfo.isStar" :star-num="repoInfo.starNum" @toggle="onToggleStar" />
                </div>
            </div>
            <!-- navBar -->
            <BaseUnderlineNav :items="navItems" :selected-name="tabName" />
        </div>
        <!-- main -->
        <div v-if="repoInfo" class="clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
            <ProductRepoEmpty v-if="!repoInfo.defaultBranchName" />
            <ProductRepoMain v-else-if="!routeType" />
            <ProductRepoTree v-else-if="routeType === 'tree'" />
            <ProductRepoBlob v-else-if="routeType === 'blob'" />
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@/components/base/BreadCrumb.vue'
import type { UnderlineNavItem } from '@/components/base/UnderlineNav.vue';
import { join } from '@/shared/path'
import { useAuth } from '~~/store/auth';
import { formatRepoType } from '~~/shared/enumFormat'
import { useRepo } from '~~/store/repo';
import '@/assets/css/highjs.css'
const authStore = useAuth()
const username = useRoute().params.username as string
const reponame = useRoute().params.reponame as string
const refName = (useRoute().params.branch || '') as string
const path = (useRoute().params.path || []) as string[]
const routeType = useRoute().params.type as string | undefined
const isMyself = computed(() => {
    return authStore.info && authStore.info.username === username
})
const breadcrumbItems = reactive<BreadcrumbItem[]>([
    {
        name: username,
        url: `/${username}`,
        selected: false,
        strong: false,
    },
    {
        name: reponame,
        url: join(`/${username}`, reponame),
        selected: true,
        strong: true,
    }
])
const repoStore = useRepo()
await repoStore.fetchRepo(username, reponame, refName)
await repoStore.fetchLatestCommit(username, reponame, path.join('/'))
const repoInfo = repoStore.repoInfo
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
switchTab(useRoute().query.tab as string)
useRouter().afterEach((to, from) => {
    if (to.path === from.path) {
        switchTab(to.query.tab as string)
    }
})
const navItems = reactive<UnderlineNavItem[]>([
    {
        name: 'Code',
        query: '',
        icon: 'code',
    },
    {
        name: 'Issues',
        query: 'issues',
        icon: 'issue',
        number: 18,
    },
    {
        name: 'Pull Request',
        query: 'pull request',
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

.topic-tag {
    display: inline-block;
    padding: 0 7px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: 2em;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 22px;
    color: #0969da;
    background-color: #ddf4ff;
    border: 1px solid rgba(0, 0, 0, 0);
}

.topic-tag:hover {
    color: #ffffff;
    background-color: #0969da;
}
</style>