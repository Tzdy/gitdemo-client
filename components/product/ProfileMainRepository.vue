<template>
    <div class="position-relative">
        <!-- header -->
        <div class="border-bottom color-border-muted py-3">
            <!-- mobile new repository btn -->
            <NuxtLink to="/new"
                class="d-md-none btn btn-primary d-flex flex-items-center flex-justify-center width-full mb-4">
                <BaseSvgIcon class="octicon mr-1" name="repository" :size="16" />
                New
            </NuxtLink>
            <div class="d-flex flex-items-start">
                <div class="d-flex flex-column flex-lg-row flex-auto width-full">
                    <div class="mb-1 mb-md-0 mr-md-3 flex-auto">
                        <input type="search" class="form-control width-full" placeholder="Find a repository…"
                            autocomplete="off" aria-label="Find a repository…">
                    </div>
                    <div class="d-flex flex-wrap">
                        <BaseSelectMenu class="position-relative mt-1 mt-lg-0 mr-1" title="Type" :items="selectType"
                            default-item="All" @select="onSelectType" />
                        <BaseSelectMenu class="position-relative mt-1 mt-lg-0 mr-1" title="Language"
                            :items="selectLanguage" default-item="All" @select="onSelectLanguage" />
                        <BaseSelectMenu class="position-relative mt-1 mt-lg-0 mr-1" title="Sort" :items="selectSort"
                            default-item="Last updated" @select="onSelectSort" />
                    </div>
                </div>
                <!-- pc new repository btn -->
                <div class="d-none d-md-flex flex-md-items-center flex-md-justify-end">
                    <NuxtLink to="/new" class="text-center btn btn-primary ml-3">
                        <BaseSvgIcon class="octicon mr-1" name="repository" :size="16" />
                        New
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- repository list -->
        <ul>
            <li v-for="repo in repoList" :key="repo.repoName"
                class="col-12 d-flex flex-justify-between width-full py-4 border-bottom color-border-muted">
                <div class="col-10 col-lg-9 d-inline-block">
                    <h3 class="wb-break-all">
                        <NuxtLink :to="repo.url" itemprop="name codeRepository">
                            {{ repo.repoName }}</NuxtLink>
                        <span class="Label Label--secondary v-align-middle ml-1 mb-1">{{ repo.type }}</span>
                    </h3>
                    <p class="wb-break-all col-9 d-inline-block color-fg-muted mb-2 pr-4" itemprop="description">
                        {{ repo.repoName }}
                    </p>
                    <div class="f6 color-fg-muted mt-2">
                        <BaseLanguage class="d-inline-block mr-3" :language="repo.language" />
                        <NuxtLink v-show="repo.starNum" to="/Tzdy/Tsdy-module/stargazers"
                            class="Link--muted mr-3 no-wrap">
                            <BaseSvgIcon name="star" :size="16" class="octicon mr-1" />
                            <span>{{ repo.starNum }}</span>
                        </NuxtLink>
                        <NuxtLink v-show="repo.forkNum" to="/Tzdy/Tsdy-module/network/members"
                            class="mr-3 Link--muted no-wrap">
                            <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                            <span>{{ repo.forkNum }}</span>
                        </NuxtLink>
                        <span class="mr-1">Updated</span>
                        <span>{{ repoUpdatedTime(repo.updatedTime) }}</span>
                    </div>
                </div>
                <div class="col-2 d-flex flex-column flex-justify-around flex-items-end ml-3">
                    <ShareStarToggleBtn :star="repo.isStar" @toggle="onToggleStar" />
                </div>

            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { repoUpdatedTime } from '@/shared/timeFormat'
import { listRepo } from '~~/api/repo';
import { join } from '~~/shared/path';

interface RepoInfo {
    repoName: string;
    type: 'Public' | 'Private',
    url: string;
    about: string,
    language: string,
    updatedTime: number,
    starNum: number,
    forkNum: number,
    isStar?: boolean
}

const username = useRoute().params['username'] as string
const selectType = reactive(['All', 'Public', 'Private'])
const selectLanguage = reactive(['All', 'JavaScript', 'Css', 'TypeScript', 'C'])
const selectSort = reactive(['Last updated', 'Name', 'Star'])
const repoList = ref<RepoInfo[]>()
async function fetchListRepo() {
    const { data, errMessage } = await listRepo(username, 1, 50)
    if (!errMessage) {
        repoList.value = data.repoList.map(repo => ({
            repoName: repo.repo_name,
            url: join(username, repo.repo_name),
            about: repo.about,
            type: repo.type === 0 ? 'Public' : 'Private',
            language: repo.language,
            sortIndex: repo.is_overview,
            starNum: repo.star_num,
            forkNum: 0,
            updatedTime: repo.update_time,
        }))
    }
}
await useAsyncData(async () => await fetchListRepo())

console.log(repoList.value)

function onSelectType(type: string) {
    console.log(type)
}
function onSelectLanguage(language: string) {
    console.log(language)
}
function onSelectSort(language: string) {
    console.log(language)
}

function onToggleStar(isStar: boolean) {
}


</script>

<style scoped>

</style>