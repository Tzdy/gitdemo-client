<template>
    <div class="Box md Box--responsive">
        <div
            class="d-flex top-0 border-top-0 border-bottom p-2 flex-items-center flex-justify-between color-bg-default rounded-top-2">
            <div class="d-flex flex-items-center">
                <details class="dropdown details-reset details-overlay">
                    <summary class="btn btn-octicon m-0 mr-2 p-2">
                        <BaseSvgIcon name="list-unordered" :size="16" class="octicon" />
                    </summary>
                    <div class="SelectMenu">
                        <div class="SelectMenu-modal rounded-3 mt-1">
                            <div class="SelectMenu-list SelectMenu-list--borderless p-2">
                                <NuxtLink class="filter-item SelectMenu-item ws-normal wb-break-word line-clamp-2 py-1">
                                    Documents
                                </NuxtLink>
                                <NuxtLink class="filter-item SelectMenu-item ws-normal wb-break-word line-clamp-2 py-1">
                                    Examples
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </details>
                <h2 class="Box-title">
                    <NuxtLink class="Link--primary">README.md</NuxtLink>
                </h2>
            </div>
        </div>
        <div class="Box-body px-5 pb-5">
            <article class="markdown-body entry-content container-lg" v-html="html"></article>
        </div>
    </div>
</template>

<script setup lang="ts">
import Markdown from 'markdown-it'
import { md } from './markdown'
const markdown = Markdown()
const props = defineProps({
    data: {
        type: String,
        default: md
    }
})
const html = ref('')
html.value = markdown.render(props.data)
</script>

<style scoped>

</style>