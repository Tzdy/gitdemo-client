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
                    <ShareToggleBtn :toggle-num="repoInfo.watchNum" icon="eye" @toggle="onToggleWatch"
                        :is-toggle="repoInfo.isWatch" text="Watch" toggle-text="Unwatch" />
                    <button @click="onFork" class="btn-sm btn">
                        <BaseSvgIcon name="fork" :size="16" class="octicon mr-2" />
                        <span>Fork</span>
                        <span class="Counter">{{ repoInfo.forkNum }}</span>
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
                    <!-- select branch, clone repo -->
                    <div class="file-navigation mb-3 d-flex flex-items-start">
                        <BaseSelectBranchMenu :branch-list="repoInfo.branchList" :tag-list="repoInfo.tagList"
                            :select-name="repoInfo.selectName" :select-type="repoInfo.selectType"
                            :default-name="repoInfo.defaultName" :default-type="repoInfo.defaultType" />
                        <div
                            class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                            <NuxtLink :to="join(useRoute().path, 'branches')" class="Link--primary no-underline">
                                <BaseSvgIcon name="branch" :size="16" class="octicon mr-1" />
                                <strong class="mr-1">{{ repoInfo.branchList.length }}</strong>
                                <span class="color-fg-muted">branches</span>
                            </NuxtLink>
                        </div>
                        <div
                            class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                            <NuxtLink :to="join(useRoute().path, 'tags')" class="Link--primary no-underline">
                                <BaseSvgIcon name="tag" :size="16" class="octicon mr-1" />
                                <strong class="mr-1">{{ repoInfo.tagList.length }}</strong>
                                <span class="color-fg-muted">tags</span>
                            </NuxtLink>
                        </div>
                        <div class="flex-auto"></div>

                        <BaseSelectCloneMenu :https-url="repoInfo.httpsUrl" :ssh-url="repoInfo.sshUrl" />
                    </div>
                    <!-- repo list -->
                    <BaseDirectory :branch="repoInfo.branch" :directories="directory"
                        :latest-commit="repoInfo.latestCommit" :commit-num="repoInfo.commitNum"
                        :reponame="useRoute().params.reponame + ''" :username="useRoute().params.username + ''"
                        :path="(useRoute().params.path as string[])" />
                </div>
                <!-- right -->
                <div class="Layout-sidebar">
                    <div class="hide-sm hide-md py-4 mt-n4 border-bottom color-border-muted">
                        <h2 class="mb-3 h4">About</h2>
                        <!-- description -->
                        <p class="f4 my-3">{{ repoInfo.description }}</p>
                        <!-- link -->
                        <div class="my-3 d-flex flex-items-center">
                            <BaseSvgIcon name="link" :size="16" class="octicon flex-shrink-0 mr-2" />
                            <span class="flex-auto min-width-0 css-truncate css-truncate-target width-fit">
                                <NuxtLink class="text-bold" :to="repoInfo.link" target="_blank">{{ repoInfo.link }}
                                </NuxtLink>
                            </span>
                        </div>
                        <!-- topic tags -->
                        <div class="my-3 f6">
                            <NuxtLink v-for="topicTag in repoInfo.topicTagList" :key="topicTag"
                                class="mr-1 no-underline topic-tag" :to="`/topics/${topicTag}`">{{ topicTag }}
                            </NuxtLink>
                        </div>
                        <!-- Readme -->
                        <div class="mt-2">
                            <NuxtLink to="#readme" class="Link--muted">
                                <BaseSvgIcon name="book" :size="16" class="octicon mr-2" />
                                <span>Readme</span>
                            </NuxtLink>
                        </div>
                        <!-- license -->
                        <div class="mt-2">
                            <NuxtLink :to="join(useRoute().path, `blob/${repoInfo.branch}/LICENSE`)"
                                class="Link--muted">
                                <BaseSvgIcon name="law" :size="16" class="octicon mr-2" />
                                <span>{{ repoInfo.license }}</span>
                            </NuxtLink>
                        </div>
                        <!-- stars -->
                        <div class="mt-2">
                            <NuxtLink :to="join(useRoute().path, `stargazers`)" class="Link--muted">
                                <BaseSvgIcon name="star" :size="16" class="octicon mr-2" />
                                <strong class="mr-1">{{ repoInfo.starNum }}</strong>
                                <span>stars</span>
                            </NuxtLink>
                        </div>
                        <!-- watch -->
                        <div class="mt-2">
                            <NuxtLink :to="join(useRoute().path, `watchers`)" class="Link--muted">
                                <BaseSvgIcon name="eye" :size="16" class="octicon mr-2" />
                                <strong class="mr-1">{{ repoInfo.watchNum }}</strong>
                                <span>watching</span>
                            </NuxtLink>
                        </div>
                        <!-- forks -->
                        <div class="mt-2">
                            <NuxtLink :to="join(useRoute().path, `forks`)" class="Link--muted">
                                <BaseSvgIcon name="fork" :size="16" class="octicon mr-2" />
                                <strong class="mr-1">{{ repoInfo.forkNum }}</strong>
                                <span>forks</span>
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- release box -->
                    <div class="border-bottom color-border-muted py-4">
                        <h2 class="h4 mb-3">
                            <NuxtLink class="Link--primary no-underline" :to="join(useRoute().path, 'releases')">
                                <span>Releases</span>
                                <span class="Counter">{{ repoInfo.release.length }}</span>
                            </NuxtLink>
                        </h2>
                        <NuxtLink class="Link--primary d-flex no-underline"
                            :to="join(useRoute().path, `releases/tags/${repoInfo.release.latestRelease.name}`)">
                            <BaseSvgIcon name="tag" :size="16" class="octicon flex-shrink-0 mt-1 color-fg-success" />
                            <div class="ml-2 min-width-0">
                                <div class="d-flex">
                                    <span class="css-truncate css-truncate-target text-bold mr-2">
                                        {{ repoInfo.release.latestRelease.name }}
                                    </span>
                                    <span class="Label Label--success flex-shrink-0">Latest</span>
                                </div>
                                <div class="text-small color-fg-muted">
                                    <span class="no-wrap">{{ repoInfo.release.latestRelease.date }}</span>
                                </div>
                            </div>
                        </NuxtLink>
                        <div v-show="repoInfo.release.length > 1" class="mt-3">
                            <NuxtLink :to="join(useRoute().path, 'releases')">
                                <span class="mr-1">+ {{ repoInfo.release.length - 1 }} releases</span>
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- Contributors -->
                    <div class="border-bottom color-border-muted py-4">
                        <h2 class="h4 mb-3">
                            <NuxtLink :to="join(useRoute().path, 'contributors')" class="Link--primary no-underline">
                                <span>Contributors</span>
                                <span class="Counter">{{ repoInfo.contributor.length }}</span>
                            </NuxtLink>
                        </h2>
                        <ul class="list-style-none d-flex flex-wrap mb-n2">
                            <li v-for="item in repoInfo.contributor.topArray" :key="item.name" class="mb-2 mr-2">
                                <NuxtLink :to="`/${item.name}`">
                                    <img width="32" height="32" :src="item.avatar" class="avatar circle" alt="">
                                </NuxtLink>
                            </li>
                        </ul>
                        <div v-show="repoInfo.release.length > 11" class="mt-3">
                            <NuxtLink :to="join(useRoute().path, 'contributors')">
                                <span class="mr-1">+ {{ repoInfo.release.length - 11 }} contributors</span>
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- language -->
                    <div class="py-4">
                        <h2 class="h4 mb-3">
                            Languages
                        </h2>
                        <BaseLanguageProgress :items="repoInfo.languageList" />
                    </div>
                </div>
            </div>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@/components/base/BreadCrumb.vue'
import type { UnderlineNavItem } from '@/components/base/UnderlineNav.vue';
import { join } from '@/shared/path'
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
    branch: 'master',
    type: 'Public',
    httpsUrl: 'https://github.com/swc-project/website.git',
    sshUrl: 'git@github.com:swc-project/website.git',
    isStar: false,
    isWatch: false,
    isOverview: false,
    starNum: 100,
    watchNum: 20,
    forkNum: 1,
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
    latestCommit: {
        username: 'Tsdy',
        avatar: 'https://www.tsdy.club/git/manage/user/info/avatar/Tsdy',
        content: 'docs: make wording slightly clearer ',
        hash: '9ef270915996195f40def244a33845449f67dbe9',
        date: '2 hours ago'
    },
    commitNum: 2003,
    description: 'The Hybrid Vue(3) Framework.',
    link: 'https://v3.nuxtjs.org',
    topicTagList: ["framework", 'nuxt', 'vue'],
    license: 'MIT license',
    release: {
        latestRelease: {
            name: 'v3.0.0-rc.8',
            date: '8 days ago',
        },
        length: 8,
    },
    contributor: {
        topArray: [
            {
                name: 'Tsdy',
                avatar: 'https://www.tsdy.club/git/manage/user/info/avatar/Tsdy'
            },
            {
                name: 'Cyc',
                avatar: 'https://www.tsdy.club/git/manage/user/info/avatar/Tsdy'
            }
        ],
        length: 251,
    },
    languageList: [
        {
            name: 'javascript',
            percentage: 0.5,
        },
        {
            name: 'typescript',
            percentage: 0.2,
        },
        {
            name: 'vue',
            percentage: 0.2
        },
        {
            name: 'css',
            percentage: 0.1
        }
    ]
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

const directory = reactive([
    {
        type: 'tree' as 'tree' | 'blob',
        name: 'src',
        time: '16 days ago',
        latestCommitContent: 'chore: add feature request template ('
    },
    {
        type: 'blob' as 'tree' | 'blob',
        name: '.gitignore',
        time: '24 days ago',
        latestCommitContent: 'chore: request template ('
    }
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