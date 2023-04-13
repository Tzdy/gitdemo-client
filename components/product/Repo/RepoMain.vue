<template>
    <div class="Layout Layout--flowRow-until-md Layout--sidebarPosition-end Layout--sidebarPosition-flowRow-end">
        <!-- left -->
        <div class="Layout-main">
            <!-- select branch, clone repo -->
            <div class="file-navigation mb-3 d-flex flex-items-start">
                <BaseSelectBranchMenu v-if="repoInfo?.defaultBranchName" :branch-list="branchList" :tag-list="tagList"
                    :select-name="repoStore.refName" select-type="branch" :default-name="repoInfo.defaultBranchName"
                    default-type="branch" @switch-tab="onSwitchTab" @open="onOpen" />
                <div class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                    <NuxtLink :to="join(useRoute().path, 'branches')" class="Link--primary no-underline">
                        <BaseSvgIcon name="branch" :size="16" class="octicon mr-1" />
                        <strong class="mr-1">{{ branchList.length }}</strong>
                        <span class="color-fg-muted">branches</span>
                    </NuxtLink>
                </div>
                <div class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                    <NuxtLink :to="join(useRoute().path, 'tags')" class="Link--primary no-underline">
                        <BaseSvgIcon name="tag" :size="16" class="octicon mr-1" />
                        <strong class="mr-1">{{ tagList.length }}</strong>
                        <span class="color-fg-muted">tags</span>
                    </NuxtLink>
                </div>
                <div class="flex-auto"></div>

                <BaseSelectCloneMenu :https-url="cloneHttpUrl" :ssh-url="cloneSSHUrl" />
            </div>
            <!-- repo list -->
            <BaseDirectory v-if="latestCommit && directory" :branch="repoStore.refName" :directories="directory"
                :latest-commit="latestCommit" :commit-num="latestCommit.totalCommitNum"
                :reponame="useRoute().params.reponame + ''" :username="useRoute().params.username + ''"
                :path="(useRoute().params.path as string[])" />
            <!-- README -->
            <BaseMarkdown :data="readmeRaw" v-if="readmeRaw" />
        </div>
        <!-- right -->
        <div class="Layout-sidebar">
            <div class="hide-sm hide-md py-4 mt-n4 border-bottom color-border-muted">
                <h2 class="mb-3 h4">About</h2>
                <!-- description -->
                <p class="f4 my-3">{{ repoInfo.about }}</p>
                <!-- link -->
                <div class="my-3 d-flex flex-items-center">
                    <BaseSvgIcon name="link" :size="16" class="octicon flex-shrink-0 mr-2" />
                    <span class="flex-auto min-width-0 css-truncate css-truncate-target width-fit">
                        <NuxtLink class="text-bold" :to="repoInfo.website" target="_blank">{{ repoInfo.website }}
                        </NuxtLink>
                    </span>
                </div>
                <!-- topic tags -->
                <!-- <div class="my-3 f6">
                    <NuxtLink v-for="topicTag in repoInfo.topicTagList" :key="topicTag"
                        class="mr-1 no-underline topic-tag" :to="`/topics/${topicTag}`">{{ topicTag }}
                    </NuxtLink>
                </div> -->
                <!-- Readme -->
                <div class="mt-2">
                    <NuxtLink to="#readme" class="Link--muted">
                        <BaseSvgIcon name="book" :size="16" class="octicon mr-2" />
                        <span>Readme</span>
                    </NuxtLink>
                </div>
                <!-- license -->
                <!-- <div class="mt-2">
                    <NuxtLink :to="join(useRoute().path, `blob/${repoInfo.branch}/LICENSE`)" class="Link--muted">
                        <BaseSvgIcon name="law" :size="16" class="octicon mr-2" />
                        <span>{{ repoInfo.license }}</span>
                    </NuxtLink>
                </div> -->
                <!-- stars -->
                <div class="mt-2">
                    <NuxtLink :to="join(useRoute().path, `stargazers`)" class="Link--muted">
                        <BaseSvgIcon name="star" :size="16" class="octicon mr-2" />
                        <strong class="mr-1">{{ repoInfo.starNum }}</strong>
                        <span>stars</span>
                    </NuxtLink>
                </div>
                <!-- watch -->
                <!-- <div class="mt-2">
                    <NuxtLink :to="join(useRoute().path, `watchers`)" class="Link--muted">
                        <BaseSvgIcon name="eye" :size="16" class="octicon mr-2" />
                        <strong class="mr-1">{{ repoInfo.watchNum }}</strong>
                        <span>watching</span>
                    </NuxtLink>
                </div> -->
                <!-- forks -->
                <!-- <div class="mt-2">
                    <NuxtLink :to="join(useRoute().path, `forks`)" class="Link--muted">
                        <BaseSvgIcon name="fork" :size="16" class="octicon mr-2" />
                        <strong class="mr-1">{{ repoInfo.forkNum }}</strong>
                        <span>forks</span>
                    </NuxtLink>
                </div> -->
            </div>
            <!-- release box -->
            <div class="border-bottom color-border-muted py-4">
                <h2 class="h4 mb-3">
                    <!-- <NuxtLink class="Link--primary no-underline" :to="join(useRoute().path, 'releases')">
                        <span>Releases</span>
                        <span class="Counter">{{ repoInfo.release.length }}</span>
                    </NuxtLink> -->
                </h2>
                <!-- <NuxtLink class="Link--primary d-flex no-underline"
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
                </div> -->
            </div>
            <!-- Contributors -->
            <!-- <div class="border-bottom color-border-muted py-4">
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
            </div> -->
            <!-- language -->
            <div v-if="languageAnalysis" class="py-4">
                <h2 class="h4 mb-3">
                    Languages
                </h2>
                <BaseLanguageProgress :items="languageAnalysis" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@/components/base/BreadCrumb.vue'
import type { UnderlineNavItem } from '@/components/base/UnderlineNav.vue';
import { join, avatarUrl } from '@/shared/path'
import { useRepo } from '@/store/repo'
import { catRepoFile, listRepoFile } from '~~/api/repo';
import { GetOneRepoResDto } from '~~/api/repo/getOneRepoDto';
import { RefType } from '~~/api/repo/listRepoRefDto';
import { DirectoryItem } from '~~/components/base/Directory.vue';
import highjs from 'highlight.js/lib/common'
const repoStore = useRepo()
const username = useRoute().params.username as string
const reponame = useRoute().params.reponame as string
const path = useRoute().params.path as string[]
const repoInfo = useRepo().repoInfo as GetOneRepoResDto["data"]
const branchList = computed(() => repoStore.repoRef.branchList.map(item => item.name))
const tagList = computed(() => repoStore.repoRef.tagList.map(item => item.name))
const refName = repoStore.refName
function latestCommitInit() {
    if (!repoStore.latestCommit) {
        return null
    } else {
        const { createTime, ...res } = repoStore.latestCommit
        const commit = {
            avatar: avatarUrl(res.userId),
            createTime: new Date(createTime),
            ...res
        }
        return commit
    }
}
const latestCommit = latestCommitInit()
// clone url
const cloneHttpUrl = computed(() => join(useRuntimeConfig().public.gitBase, `${username}/${reponame}.git`))
const cloneSSHUrl = computed(() => '')
function onOpen() {
    repoStore.fetchRef(username, reponame, RefType.BRANCH)
}

function onSwitchTab(tabName: string) {
    if (tabName === 'tag') {
        repoStore.fetchRef(username, reponame, RefType.TAG)
    }
}

// 语言分析
const languageAnalysis = computed(() => {
    if (repoInfo) {
        const sumFile = repoInfo.languageAnalysis.reduce((a, b) => {
            return a + b.fileNum
        }, 0)
        return repoInfo.languageAnalysis.map(item => {
            return {
                name: item.language.language,
                color: item.language.color,
                percentage: item.fileNum / sumFile
            }
        })
    }
    return null
})

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
console.log(tabName.value)
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

const directory = ref<DirectoryItem[] | null>(null)
const readmeCodeLine = ref<string[]>([])
const readmeRaw = ref('')
const readmeSize = ref(0)

async function fetchReadme() {
    const { errMessage, response } = await catRepoFile({
        username,
        repoName: reponame,
        branch: refName,
        path: 'README.md'
    })
    if (!errMessage) {
        readmeRaw.value = response.data.value
        readmeCodeLine.value = highjs.highlightAuto(response.data.value).value.split('\n')
        readmeSize.value = response.data.size
    }
}

async function fetchRepoFileList() {
    const { response, errMessage } = await listRepoFile({
        branch: repoStore.refName,
        repoName: reponame,
        username,
    })
    if (!errMessage) {
        directory.value = response.data.list.map(item => {
            return {
                type: item.type,
                name: item.name,
                time: item.commitTime,
                latestCommitContent: item.commitContent,
            }
        })
        const readme = directory.value.find(item => item.name.toLowerCase() === 'readme.md')
        if (readme) {
            fetchReadme()
        }
        directory.value.sort((a, b) => {
            if (a.type === 'blob' && b.type === 'tree') {
                return 1
            } else if (a.type === 'tree' && b.type === 'blob') {
                return -1
            }
            return a.name.localeCompare(b.name)

        })
    }
}
await fetchRepoFileList()

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