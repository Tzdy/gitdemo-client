<template>
    <div class="file-navigation mb-3 d-flex flex-items-start">
        <BaseSelectBranchMenu v-if="repoInfo?.defaultBranchName" :branch-list="branchList" :tag-list="tagList"
            :select-name="repoStore.refName" select-type="branch" :default-name="repoInfo.defaultBranchName"
            default-type="branch" @switch-tab="onSwitchTab" @open="onOpen" />
        <div class="flex-self-center ml-3 flex-self-stretch d-none d-lg-flex flex-items-center lh-condensed-ultra">
            <NuxtLink :to="join(username, reponame, 'branches')" class="Link--primary no-underline">
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
        :latest-commit="latestCommit" :commit-num="latestCommit.totalCommitNum" :reponame="useRoute().params.reponame + ''"
        :username="useRoute().params.username + ''" :path="(useRoute().params.path as string[])" />
    <!-- README -->
    <BaseMarkdown />
</template>

<script setup lang="ts">
import { avatarUrl, join } from "@/shared/path";
import { useRepo } from "@/store/repo";
import { catRepoFile, listRepoFile } from "~~/api/repo";
import { RefType } from "~~/api/repo/listRepoRefDto";
import { DirectoryItem } from "~~/components/base/Directory.vue";
import highjs from 'highlight.js/lib/common'
const repoStore = useRepo();
const username = useRoute().params.username as string;
const reponame = useRoute().params.reponame as string;
const path = useRoute().params.path as string[]
const repoInfo = computed(() => repoStore.repoInfo);
const refName = repoStore.refName
const branchList = computed(() =>
    repoStore.repoRef.branchList.map((item) => item.name)
);
const tagList = computed(() =>
    repoStore.repoRef.tagList.map((item) => item.name)
);
const latestCommit = computed(() => {
    if (!repoStore.latestCommit) {
        return null;
    } else {
        const { createTime, ...res } = repoStore.latestCommit;
        const commit = {
            avatar: avatarUrl(res.userId),
            createTime: new Date(createTime),
            ...res,
        };
        return commit;
    }
});
// clone url
const cloneHttpUrl = computed(() =>
    join(useRuntimeConfig().public.gitBase, `${username}/${reponame}.git`)
);
const cloneSSHUrl = computed(() => "");

function onOpen() {
    repoStore.fetchRef(username, reponame, RefType.BRANCH);
}

function onSwitchTab(tabName: string) {
    if (tabName === "tag") {
        repoStore.fetchRef(username, reponame, RefType.TAG);
    }
}

const directory = ref<DirectoryItem[] | null>(null);
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
        path: path.join('/')
    });
    if (!errMessage) {
        directory.value = response.data.list.map((item) => {
            return {
                type: item.type,
                name: item.name,
                time: item.commitTime,
                latestCommitContent: item.commitContent,
            };
        });
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
