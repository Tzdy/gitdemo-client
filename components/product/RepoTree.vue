<template>
    <!-- main -->
    <div class="clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
        <!-- select branch, clone repo -->
        <div class="file-navigation mb-3 d-flex flex-items-start">
            <BaseSelectBranchMenu :branch-list="repoInfo.branchList" :tag-list="repoInfo.tagList"
                :select-name="repoInfo.selectName" :select-type="repoInfo.selectType"
                :default-name="repoInfo.defaultName" :default-type="repoInfo.defaultType" />
            <div class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
                <NuxtLink :to="join(useRoute().path, 'branches')" class="Link--primary no-underline">
                    <BaseSvgIcon name="branch" :size="16" class="octicon mr-1" />
                    <strong class="mr-1">{{ repoInfo.branchList.length }}</strong>
                    <span class="color-fg-muted">branches</span>
                </NuxtLink>
            </div>
            <div class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
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
        <BaseDirectory :branch="repoInfo.branch" :directories="directory" :latest-commit="repoInfo.latestCommit"
            :commit-num="repoInfo.commitNum" :reponame="useRoute().params.reponame + ''"
            :username="useRoute().params.username + ''" :path="(useRoute().params.path as string[])" />
        <!-- README -->
        <BaseMarkdown />
    </div>
</template>

<script setup lang="ts">
import { join } from '@/shared/path'

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
.SelectMenu-list--borderless>.SelectMenu-item {
    border-bottom: 0;
}
</style>