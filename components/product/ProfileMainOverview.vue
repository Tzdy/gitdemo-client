<template>
    <div class="position-relative">
        <div class="mt-4">
            <div>
                <BaseSelectOverviewPanel @submit="onSubmitChangeOverview" @open="onOpenChangeOverview"
                    :visible="isMyself" :repo-list="allRepoList" />
                <BaseOverviewPanel @change="onChangeOverviewSort" :allow-drag="!!isMyself" :overviews="overviewList" />
            </div>
        </div>
        <div class="mt-4">
            <h2 class="f4 text-normal mb-2">
                2
                contributions
                in the last year
            </h2>
            <BaseCalendar />
        </div>
    </div>
</template>

<script setup lang="ts">
import { listRepo, setRepo } from '~~/api/repo'
import { join } from '~~/shared/path';
import { useAuth } from '~~/store/auth';
import { Overview } from '../base/OverviewPanel.vue';

const username = useRoute().params.username as string

const authStore = useAuth()

const isMyself = computed(() => {
    return authStore.info ? authStore.info.username === username : false
})


async function fetchOverview() {
    const { errMessage, data } = await listRepo(username, 1, 6, true, 0)
    if (!errMessage) {
        return data.repoList
    }
}

async function fetchRepo() {
    const { errMessage, data } = await listRepo(username, 1, 50, false, 0)
    if (!errMessage) {
        return data.repoList
    }
}

async function fetchAllRepo() {
    const { errMessage, data } = await listRepo(username, 1, 50, undefined, 0)
    if (!errMessage) {
        return data.repoList
    }
}

const repoList = (await useAsyncData(async () => {
    return await fetchOverview()
})).data

const overviewList = computed<Overview[]>(() => {
    if (!repoList.value) {
        return []
    }
    return repoList.value.map(repo => ({
        id: repo.id,
        repoName: repo.repo_name,
        url: join(username, repo.repo_name),
        about: repo.about,
        type: repo.type === 0 ? 'Public' : 'Private',
        language: repo.language,
        sortIndex: repo.is_overview,
        starNum: repo.star_num,
        forkNum: 0,
    }))
})

const allRepoList = ref<Overview[]>([])

async function onOpenChangeOverview() {
    const overviewList: Overview[] = []
    const list: Overview[] = []
    !(await fetchAllRepo())?.map(repo => ({
        id: repo.id,
        repoName: repo.repo_name,
        url: join(username, repo.repo_name),
        about: repo.about,
        type: (repo.type === 0 ? 'Public' : 'Private') as 'Public' | 'Private',
        language: repo.language,
        sortIndex: repo.is_overview,
        starNum: repo.star_num,
        forkNum: 0,
    })).forEach(item => {
        if (item.sortIndex !== 0) {
            overviewList.push(item)
        } else {
            list.push(item)
        }
    })
    overviewList.sort((a, b) => a.sortIndex - b.sortIndex)
    allRepoList.value = overviewList.concat(list)
}

async function onChangeOverviewSort(oldOverview: Overview[], newOverview: Overview[]) {
    oldOverview.sort((a, b) => a.sortIndex - b.sortIndex)
    newOverview.sort((a, b) => a.sortIndex - b.sortIndex)

    for (let i = 0; i < oldOverview.length; i++) {
        if (newOverview[i].repoName !== oldOverview[i].repoName) {
            await setRepo(newOverview[i].id, undefined, undefined, undefined, undefined, undefined, newOverview[i].sortIndex)
        }
    }
}

async function onSubmitChangeOverview(oldList: Overview[], newList: Overview[], close: Function) {
    newList.sort((a, b) => a.sortIndex - b.sortIndex)
    for (let i = 0; i < newList.length; i++) {
        const old = oldList.find(item => item.repoName === newList[i].repoName)
        if (old?.sortIndex !== newList[i].sortIndex) {
            await setRepo(newList[i].id, undefined, undefined, undefined, undefined, undefined, newList[i].sortIndex)
        }
    }
    close()
    repoList.value = await fetchOverview()
}
</script>