<template>
    <div class="position-relative">
        <!-- header -->
        <div class="border-bottom color-border-muted py-3">
            <!-- mobile new repository btn -->
            <a href="/new"
                class="d-md-none btn btn-primary d-flex flex-items-center flex-justify-center width-full mb-4">
                <BaseSvgIcon class="octicon mr-1" name="repository" :size="16" />
                New
            </a>
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
                    <a href="/new" class="text-center btn btn-primary ml-3">
                        <BaseSvgIcon class="octicon mr-1" name="repository" :size="16" />
                        New
                    </a>
                </div>
            </div>
        </div>
        <!-- repository list -->
        <ul>
            <li class="col-12 d-flex flex-justify-between width-full py-4 border-bottom color-border-muted">
                <div class="col-10 col-lg-9 d-inline-block">
                    <h3 class="wb-break-all">
                        <a href="/Tzdy/Tsdy-module" itemprop="name codeRepository">
                            Tsdy-module</a>
                        <span class="Label Label--secondary v-align-middle ml-1 mb-1">Public</span>
                    </h3>
                    <p class="col-9 d-inline-block color-fg-muted mb-2 pr-4" itemprop="description">
                        通过原生js，css完成的组件
                    </p>
                    <div class="f6 color-fg-muted mt-2">
                        <BaseLanguage class="d-inline-block mr-3" language="TypeScript" />
                        <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted mr-3">
                            <BaseSvgIcon name="stars" :size="16" class="octicon mr-1" />
                            <span>{{ 12 }}</span>
                        </NuxtLink>
                        <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="mr-3 Link--muted">
                            <BaseSvgIcon name="fork" :size="16" class="octicon mr-1" />
                            <span>{{ 1 }}</span>
                        </NuxtLink>
                        <span class="mr-1">Updated</span>
                        <span>on 5 Jul 2019</span>
                    </div>
                </div>

            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const selectType = reactive(['All', 'Public', 'Private'])
const selectLanguage = reactive(['All', 'JavaScript', 'Css', 'TypeScript', 'C'])
const selectSort = reactive(['Last updated', 'Name', 'Star'])
function onSelectType(type: string) {
    console.log(type)
}
function onSelectLanguage(language: string) {
    console.log(language)
}
function onSelectSort(language: string) {
    console.log(language)
}

</script>

<style scoped>
</style>