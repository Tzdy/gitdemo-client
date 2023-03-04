<template>
    <!-- repo list -->
    <div class="Box mb-3">
        <!-- header -->
        <div class="Box-header position-relative">
            <div class="d-flex rounded-top-2 flex-items-center flex-wrap">
                <!-- avatar -->
                <div class="flex-shrink-0 ml-n1 mr-n1 mt-n1 mb-n1 hx_avatar_stack_commit">
                    <img width="24" height="24" class="avatar circle" :src="latestCommit.avatar" alt="">
                </div>
                <!-- middle -->
                <div class="flex-1 d-flex flex-items-center ml-3 min-width-0">
                    <div class="css-truncate css-truncate-overflow color-fg-muted">
                        <NuxtLink class="text-bold color-fg-default mr-1"
                            :to="`/${username}/${reponame}/commits?author=${latestCommit.username}`">
                            {{ latestCommit.username }}</NuxtLink>
                        <NuxtLink class="d-none d-sm-inline color-fg-default"
                            :to="`/${username}/${reponame}/commit/${latestCommit.hash}`">
                            {{ latestCommit.content }}</NuxtLink>
                        <div class="ml-2 d-inline-block d-inline-block d-lg-none">
                            <button class="color-fg-default ellipsis-expander">...</button>
                        </div>
                    </div>
                    <div class="d-flex flex-auto flex-justify-end ml-3 flex-items-baseline" style="white-space: nowrap">
                        <BaseSvgIcon name="check" :size="16" class="octicon color-fg-success flex-self-center " />
                        <NuxtLink :to="`/${username}/${reponame}/commit/${latestCommit.hash}`"
                            class="f6 Link--secondary text-mono ml-2 d-none d-lg-inline">
                            {{ latestCommit.hash.slice(0, 7) }}
                        </NuxtLink>
                        <NuxtLink :to="`/${username}/${reponame}/commit/${latestCommit.hash}`" class="Link--secondary ml-2">
                            {{ moment(latestCommit.createTime).fromNow() }}
                        </NuxtLink>
                    </div>
                </div>
                <!-- right -->
                <div class="flex-shrink-0">
                    <div class="ml-0 ml-md-3">
                        <NuxtLink :to="`/${username}/${reponame}/commits/${branch}`"
                            class="pl-3 pr-3 py-3 p-md-0 mt-n3 mb-n3 mr-n3 m-md-0 d-flex flex-items-center Link--primary no-underline no-wrap">
                            <BaseSvgIcon :size="16" name="history" class="mr-1" />
                            <span class="d-none d-sm-inline">
                                <strong class="mr-1">{{ commitNum }}</strong>
                                <span class="color-fg-muted d-none d-lg-inline">Commits</span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- main -->
        <div :class="{ 'Details--on': showCode }">
            <div class="Details-content--hidden-not-important d-md-block">
                <div v-for="item in directories" :key="item.name"
                    class="Box-row Box-row--focus-gray py-2 d-flex position-relative">
                    <!-- icon -->
                    <div class="mr-3 flex-shrink-0">
                        <BaseSvgIcon :name="item.type" :style="{ color: item.type === 'tree' ? '#54aeff' : '#57606a' }"
                            :size="16" class="octicon" />
                    </div>
                    <!-- name -->
                    <div class="flex-auto min-width-0 col-md-2 mr-3">
                        <span class="css-truncate css-truncate-target d-block width-fit">
                            <NuxtLink :to="formatUrl(item.type, item.name)" class="Link--primary">{{ item.name }}
                            </NuxtLink>
                        </span>
                    </div>
                    <!-- latest commit content -->
                    <div class="flex-auto min-width-0 d-none d-md-block col-5 mr-3">
                        <span class="css-truncate css-truncate-target d-block width-fit markdown-title">
                            <NuxtLink class="Link--secondary">{{ item.latestCommitContent }}</NuxtLink>
                        </span>
                    </div>
                    <!-- time -->
                    <div class="color-fg-muted text-right" style="width: 100px">
                        <span class="no-wrap">
                            {{ item.time }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="Details-content--shown Box-footer d-md-none p-0">
                <button @click="onShowCode" class="btn-link d-block width-full px-3 py-2">Views
                    Code</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { join } from '~~/shared/path';
import moment from 'moment'
export interface LatestCommit {
    avatar: string
    content: string
    hash: string
    username: string
    createTime: Date
}

export interface DirectoryItem {
    type: 'blob' | 'tree',
    name: string
    time: string
    latestCommitContent: string
}


const props = defineProps({
    latestCommit: {
        type: Object as PropType<LatestCommit>,
        default: () => ({}),
    },
    branch: {
        type: String,
    },
    commitNum: {
        type: Number,
    },
    directories: {
        type: Array as PropType<DirectoryItem[]>,
        default: () => [],
    },
    // 用于生成跳转URL
    reponame: {
        type: String
    },
    // 用于生成跳转URL
    username: {
        type: String
    },
    // 是否为项目目录首页，用于生成跳转URL
    path: {
        type: Array as PropType<string[]>,
    }
})

// 移动端，需要点击views code 才会显示代码
const showCode = ref(false)
function onShowCode() {
    showCode.value = true
}

function formatUrl(type: 'blob' | 'tree', name: string) {
    if (!props.path) {
        return `/${props.username}/${props.reponame}/${type}/${props.branch}/${name}`
    } else {
        return join(join(`/${props.username}/${props.reponame}/${type}/${props.branch}`, props.path.join('/')), name)
    }
}


</script>

<style scoped>
.Details-content--hidden-not-important {
    display: none;
}

.Details--on .Details-content--hidden-not-important {
    display: inherit;
}

.Details--on .Details-content--shown {
    display: none;
}
</style>