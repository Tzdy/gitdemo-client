<template>
    <div class="position-relative">
        <div class="border-bottom color-border-muted py-3">
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
                <div class="d-none d-md-flex flex-md-items-center flex-md-justify-end">
                    <a href="/new" class="text-center btn btn-primary ml-3">
                        <BaseSvgIcon class="octicon mr-1" name="repository" :size="16" />
                        New
                    </a>
                </div>
            </div>
        </div>
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