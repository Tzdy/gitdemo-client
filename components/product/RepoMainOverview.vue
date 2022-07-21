<template>
    <div class="position-relative">
        <div class="mt-4">
            <div>
                <!-- 自定义 overview -->
                <details class="details-reset details-overlay details-overlay-dark" ref="details">
                    <summary class="btn-link Link--muted float-right mt-1 f6">Customize your pins</summary>
                    <div class="anim-fade-in fast Box Box--overlay d-flex flex-column details-dialog"
                        style="z-Index: 999">
                        <div class="f5 d-flex flex-column overflow-hidden height-full">
                            <div class="Box-header">
                                <button @click="offDetailsHandler" class="Box-btn-octicon btn-octicon float-right"
                                    type="button">
                                    <BaseSvgIcon class="octicon" name="close" :size="16" />
                                </button>
                                <h5 class="color-fg-default">Edit pinned items</h5>
                            </div>
                            <div class="Box-body border-bottom-0">
                                <p class="color-fg-muted">
                                    Select up to six public repositories or gists you'd like to show to anyone.
                                </p>
                                <!-- search -->
                                <div class="d-flex flex-column flex-lg-row flex-auto position-relative">
                                    <div class="mb-1 mb-lg-0 mr-lg-1 flex-auto">
                                        <input type="search" class="search-input form-control width-full"
                                            placeholder="Filter repositories" autocomplete="off" spellcheck="false">
                                        <BaseSvgIcon class="search-icon octicon" name="search" :size="16" />
                                    </div>
                                </div>
                            </div>
                            <!-- 设置overview的checkbox -->
                            <div class="Box-body overflow-auto border-top">
                                <div class="mb-3">
                                    <ul class="mb-2 list-style-none position-relative">
                                        <li v-for="item in repositories" :key="item.name">
                                            <label class="d-inline-block width-full pinned-item" title="Tsdy-module">
                                                <input v-model="item.is_overview" type="checkbox"
                                                    class="f5 m-2 v-align-middle">
                                                <BaseSvgIcon class="octicon v-align-middle" name="repository"
                                                    :size="16" />
                                                <strong style="max-width: 65%"
                                                    class="ml-1 d-inline-block overflow-hidden ellipsis v-align-middle">
                                                    {{ item.name }}
                                                </strong>
                                                <span class="no-wrap color-fg-muted float-right"
                                                    style="line-height: 29px">
                                                    <span>{{ item.stars_num }}</span>
                                                    <BaseSvgIcon class="octicon" name="stars" :size="16" />
                                                </span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="Box-footer text-right border-top-0">
                                <span class="float-left text-small pt-3 lh-condensed-ultra color-fg-danger">0
                                    remaining</span>
                                <button type="submit" class="btn btn-primary">
                                    Save pins
                                </button>
                            </div>
                        </div>
                    </div>
                </details>
                <BaseOverviewPanel :overviews="overviews" />
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
import { Overview } from '../base/OverviewPanel.vue';

const repositories = reactive([
    {
        name: 'Blob',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'Tess',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'dasddasddasddasddasddasddasddasddasddasddasd',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'Blo',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'asd',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'Apple',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'gits',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'dasddasddaasdasddasddasddasddasddasddasddasddasd',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'Blosvdsv',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'asddad',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'gitsdsa',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: '233sddaasdasddasddasddasddasddasddasddasddasd',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'Blosvd331sv',
        is_overview: false,
        stars_num: 150,
    },
    {
        name: 'asdd21ad',
        is_overview: false,
        stars_num: 150,
    }
])
const details = ref<HTMLElement>(null)
function offDetailsHandler() {
    details.value.removeAttribute('open')
}

const overviews = reactive<Overview[]>([
    {
        name: 'Tsdy-Module',
        introduce: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',
        language: 'JavaScript',
        sortIndex: 2,
        starsNum: 100,
        forksNum: 3,
    },
    {
        name: 'Exist',
        introduce: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',
        language: 'JavaScript',
        sortIndex: 1,
        starsNum: 100,
        forksNum: 3,

    },
    {
        name: 'weixin-clicnent',
        introduce: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',
        language: 'Vue',
        sortIndex: 0,
        starsNum: 10,
        forksNum: 3,
    }
])
</script>

<style lang="scss" scoped>
.details-dialog {
    position: fixed;
    top: 50%;
    z-index: 111;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    max-height: 80vh;
    max-width: 448px;
    min-width: 300px;
    width: 80%;
}

.search-input {
    padding-left: 32px;
}

.search-icon {
    position: absolute;
    left: 8px;
    top: 8px;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pinned-item:hover {
    background-color: rgba(208, 215, 222, 0.32);
}
</style>