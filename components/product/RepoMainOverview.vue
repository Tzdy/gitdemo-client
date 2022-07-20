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
                <!-- loading -->
                <h2 class="f4 mb-2 text-normal">
                    Pinned
                    <svg style="box-sizing: content-box; color: var(--color-icon-primary);" width="16" height="16"
                        viewBox="0 0 16 16" fill="none" data-view-component="true"
                        class="spinner pinned-items-spinner js-pinned-items-spinner v-align-text-bottom ml-1 anim-rotate">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2"
                            vector-effect="non-scaling-stroke"></circle>
                        <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" vector-effect="non-scaling-stroke"></path>
                    </svg>
                    <span class="ml-2 color-fg-muted f6 js-pinned-items-reorder-message" role="status"
                        aria-live="polite" data-error-text="Something went wrong."
                        data-success-text="Order updated."></span>
                </h2>
                <!-- overview Box -->
                <ol class="d-flex flex-wrap list-style-none gutter-condensed mb-2">
                    <li v-for="item in overviews" :key="item.name"
                        class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
                        <div class="Box d-flex p-3 width-full">
                            <div class="width-full">
                                <!-- overview card header -->
                                <div class="d-flex width-full position-relative">
                                    <div class="flex-1">
                                        <BaseSvgIcon name="repository" :size="16" class="octicon mr-2 color-fg-muted" />
                                        <NuxtLink class="mr-2 text-bold wb-break-word" :to="item.url">
                                            <span class="repo" :title="item.name">{{ item.name }}</span>
                                        </NuxtLink>
                                        <span
                                            class="Label Label--secondary v-align-middle mt-1 no-wrap Label--inline">{{
                                                    item.type
                                            }}</span>
                                    </div>
                                    <span class="pl-2" title="Drag to reorder">
                                        <BaseSvgIcon name="drag" :size="16" class="octicon" />
                                    </span>
                                </div>

                                <!-- overview card content -->
                                <p class="color-fg-muted text-small mt-2 mb-0">
                                    {{ item.content }}
                                </p>
                                <!-- overview card info -->
                                <p class="mb-0 mt-2 f6 color-fg-muted">
                                    <span class="d-inline-block mr-3">
                                        <span class="repo-language-color mr-1" style="background-color: #f1e05a"></span>
                                        <span>JavaScript</span>
                                    </span>

                                    <NuxtLink to="/Tzdy/Tsdy-module/stargazers" class="Link--muted">
                                        <BaseSvgIcon name="stars" :size="16" class="octicon" />
                                        2
                                    </NuxtLink>
                                    <NuxtLink to="/Tzdy/Tsdy-module/network/members" class="ml-3 Link--muted">
                                        <BaseSvgIcon name="fork" :size="16" class="octicon" />
                                        1
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </li>
                </ol>
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

const overviews = reactive([
    {
        name: 'Tsdy-Module',
        content: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',
    },
    {
        name: 'Exist',
        content: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',

    },
    {
        name: 'weixin-clicnent',
        content: ' 通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件  通过原生js，css完成的组件 ',
        url: '/Tsdy-Module',
        type: 'public',

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

.repo-language-color {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-primer-border-contrast);
    border-radius: 50%;
}
</style>