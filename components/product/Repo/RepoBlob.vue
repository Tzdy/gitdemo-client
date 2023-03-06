<template>
    <div class="Box mt-2">
        <div class="Box-header">
            <div class="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1">
                <span class="mr-1">{{ blobLine.length }} lines ({{ blobLine.length }} sloc)</span>
                <span class="file-info-divider"></span>
                <span class="ml-1">{{ size }} Bytes</span>
            </div>
        </div>
        <div class="Box-body overflow-x-auto">
            <table class="code-content">
                <tbody>
                    <tr v-for="item, index in blobLine" :key="index" class="code-line">
                        <td class="code-index pl-4 pr-2 color-fg-subtle f6">{{ index }}</td>
                        <td class="pl-2">
                            <pre><code v-html="item"></code></pre>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { catRepoFile } from '~~/api/repo';
import { useRepo } from '~~/store/repo';
import highjs from 'highlight.js/lib/common'
const repoStore = useRepo();
const username = useRoute().params.username as string;
const reponame = useRoute().params.reponame as string;
const path = useRoute().params.path as string[]
const refName = repoStore.refName

const blobLine = ref<string[]>([])
const size = ref(0)

async function fetchBlob() {
    const { errMessage, response } = await catRepoFile({
        username,
        repoName: reponame,
        branch: refName,
        path: path.join('/')
    })
    if (!errMessage) {
        blobLine.value = highjs.highlightAuto(response.data.value).value.split('\n')
        size.value = response.data.size
    }
}
fetchBlob()
</script>

<style scoped>
.code-index {
    user-select: none;
}

.file-info-divider {
    display: inline-block;
    width: 1px;
    height: 18px;
    margin-right: 4px;
    margin-left: 4px;
    vertical-align: middle;
    border-left: 1px solid var(--color-border-default);
}
</style>