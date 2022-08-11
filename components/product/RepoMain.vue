<template>
    <BaseContainer>
        <!-- tabbar -->
        <div class="mt-4 position-sticky top-0 d-none d-md-block color-bg-default width-full border-bottom
    color-border-muted" style="z-index:3;">
            <div class="container-xl px-3 px-md-4 px-lg-5">
                <div
                    class="Layout Layout--flowRow-until-md Layout--sidebarPosition-start Layout--sidebarPosition-flowRow-start">

                    <div class="Layout-sidebar">
                    </div>
                    <div class="Layout-main">
                        <!-- 下划线导航 -->
                        <div class="UnderlineNav width-full box-shadow-none overflow-md-x-hidden">
                            <nav ref="navElement" class="UnderlineNav-body width-full p-responsive"
                                aria-label="User profile">
                                <!-- aria-current-value="false" 由于css中可以通过这个属性判断当前处于哪一个tab -->
                                <!-- NuxtLink 处理aria-current-value的方法与css，实际情况不符合。所以直接强制为false -->
                                <NuxtLink v-for="item in navItems" :key="item.name" aria-current-value="false"
                                    :style="{ visibility: !item.visible ? 'hidden' : 'visible' }"
                                    :class="{ selected: item.selected, }" class="UnderlineNav-item" :to="item.url">
                                    <BaseSvgIcon :name="item.icon" class="octicon UnderlineNav-octicon" :size="16" />
                                    {{ item.name }}
                                    <span v-show="item.number" class="Counter">{{ item.number }}</span>
                                </NuxtLink>
                            </nav>
                            <!-- 当屏幕变小后，补充显示。 -->
                            <div class="position-absolute pr-3 pr-md-4 pr-lg-5 right-0 js-responsive-underlinenav-overflow"
                                style="">
                                <details :hidden="isNavItemsMore"
                                    class="details-overlay details-reset position-relative">
                                    <summary role="button">
                                        <div class="UnderlineNav-item mr-0 border-0">
                                            <BaseSvgIcon name="kebab" :size="16" class="octicon" />
                                            <span class="sr-only">More</span>
                                        </div>
                                    </summary>
                                    <div>
                                        <div role="menu" class="dropdown-menu dropdown-menu-sw">
                                            <ul>
                                                <li v-for="item in navItems" :hidden="item.visible" :key="item.name">
                                                    <NuxtLink class="dropdown-item" :to="item.url">{{ item.name }}
                                                    </NuxtLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </details>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- main -->
        <div class="container-xl px-3 px-md-4 px-lg-5">
            <div
                class="Layout Layout--flowRow-until-md Layout--sidebarPosition-start Layout--sidebarPosition-flowRow-start">
                <!-- 侧边栏 -->
                <div class="Layout-sidebar">
                    <div class="mt-md-n5">
                        <div>
                            <!-- 头像 and 用户名 -->
                            <div class="clearfix d-flex d-md-block flex-items-center mb-4 mb-md-0">
                                <div style="z-Index: 4;"
                                    class="position-relative d-inline-block col-2 col-md-12 mr-3 mr-md-0 flex-shrink-0">
                                    <NuxtLink to="/Tsdy/info" aria-label="change your avatar."
                                        class="tooltipped tooltipped-s d-block">
                                        <img class="avatar circle width-full border color-bg-default" :src="avatar"
                                            alt="">
                                    </NuxtLink>
                                </div>
                                <div class="float-left col-12 py-3">
                                    <h1>
                                        <span class="f2 d-block overflow-hidden">
                                            Tsdy
                                        </span>
                                        <span class="f3 text-light d-block color-fg-muted">
                                            Tzdy
                                        </span>
                                    </h1>
                                </div>
                            </div>
                            <!-- 个人信息展示和修改 -->
                            <div class="d-flex flex-column">
                                <BaseForm :hidden="!isEdit" :data="userInfo" lass="position-relative flex-auto">
                                    <div class="mb-2">
                                        <label class="f5 d-block mb-1">Name</label>
                                        <input v-model="userInfo.name" class="width-full form-control"
                                            placeholder="Name">
                                    </div>
                                    <div>
                                        <label class="f5 d-block mb-1">Bio</label>
                                        <textarea v-model="userInfo.bio" class="form-control mb-1 width-full"
                                            placeholder="Add a bio" rows="3" data-input-max-length="160"></textarea>
                                        <p class="note">
                                            You can <strong>@mention</strong> other users and organizations to link to
                                            them.
                                        </p>
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="originzation" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm"
                                            v-model="userInfo.organization" placeholder="Company">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="position" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm" v-model="userInfo.position"
                                            placeholder="Position">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="link" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm" v-model="userInfo.link"
                                            placeholder="Link">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="twitter" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm" v-model="userInfo.twitter"
                                            placeholder="Twitter">
                                    </div>
                                    <div class="my-3">
                                        <!-- error options -->
                                        <div class="color-fg-danger my-3"></div>
                                        <button type="button" class="btn-primary btn-sm btn mr-1">Submit</button>
                                        <button @click="isEdit = false" type="reset" class="btn-sm btn">Cancel</button>
                                    </div>
                                </BaseForm>
                                <div :hidden="isEdit" class="flex-column d-md-block">
                                    <div class="mb-3 f4">
                                        <div>{{ userInfo.bio }}</div>
                                    </div>
                                    <div class="mb-3">
                                        <button @click="isEdit = true" type="button" class="btn btn-block">Edit
                                            profile</button>
                                    </div>

                                    <ul class="list-style-none f5 color-fg-default">
                                        <li v-show="userInfo.organization" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="originzation"
                                                :size="16" />
                                            <span>
                                                {{ userInfo.organization }}
                                            </span>
                                        </li>
                                        <li v-show="userInfo.position" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="position"
                                                :size="16" />
                                            <span>
                                                {{ userInfo.position }}
                                            </span>
                                        </li>
                                        <li v-show="userInfo.link" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="link" :size="16" />
                                            <NuxtLink class="Link--primary" target="_blink" :to="userInfo.link">{{
                                                    userInfo.link
                                            }}</NuxtLink>
                                        </li>
                                        <li v-show="userInfo.twitter" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="twitter"
                                                :size="16" />
                                            <NuxtLink class="Link--primary" target="_blink"
                                                :to="'https://twitter.com/' + userInfo.twitter">@{{ userInfo.twitter }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Layout-main">
                    <!-- 移动端的navbar -->
                    <div class="UnderlineNav d-block d-md-none position-sticky top-0 pl-3 ml-n3
          mr-n3 pr-3 color-bg-default" style="z-index:3;">
                        <nav class="UnderlineNav-body width-full p-responsive" data-pjax="">
                            <NuxtLink aria-current-value="false" v-for="item in navItems" :key="item.name"
                                :class="{ selected: item.selected, }" class="UnderlineNav-item" :to="item.url">
                                <BaseSvgIcon :name="item.icon" class="octicon UnderlineNav-octicon" :size="16" />
                                {{ item.name }}
                                <span v-show="item.number" class="Counter">{{ item.number }}</span>
                            </NuxtLink>
                        </nav>
                    </div>
                    <!-- main -->
                    <div v-if="tabName === undefined">
                        <ProductRepoMainOverview />
                    </div>
                    <div v-else-if="tabName === 'repositories'">
                        <ProductRepoMainRepository />
                    </div>
                </div>
            </div>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useWindowEvent } from '~~/store';
const navElement = ref<HTMLElement>(null)
const navItems = reactive([
    {
        name: 'Overview',
        url: '/Tsdy',
        visible: true,
        icon: 'overview',
        selected: true,
    },
    {
        name: 'Repositories',
        url: '/Tsdy?tab=repositories',
        visible: true,
        icon: 'repository',
        selected: false,
        number: 18,
    },
    {
        name: 'Projects',
        url: '/Tsdy?tab=projects',
        visible: true,
        icon: 'projects',
        selected: false,
        number: 0,
    },
    {
        name: 'Packages',
        url: '/Tsdy?tab=packages',
        visible: true,
        icon: 'packages',
        selected: false,
        number: 0
    },
    {
        name: 'Stars',
        url: '/Tsdy?tab=stars',
        visible: true,
        icon: 'stars',
        selected: false,
        number: 0,
    },
])
const isNavItemsMore = computed(() => {
    return navItems.every(item => item.visible)
})

onMounted(() => {
    const parntElement = navElement.value
    const children = Array.from(navElement.value.children)
    const childPadding = parseInt((children[0] && getComputedStyle(children[0]).paddingLeft), 0) * 2 || 0
    const windowEvent = useWindowEvent(usePinia())
    let originWidth = parntElement.offsetWidth
    // attribute的hidden相当于display: none.
    // 这里需要使用visibility: hidden，站位但不显示。
    function navItemsResize(init?: boolean) {
        const parentWidth = parntElement.offsetWidth
        let subTotalWidth = 0
        if (init) {
            children.forEach((ele: HTMLElement, index) => {
                subTotalWidth += (ele.offsetWidth + childPadding)
                if (subTotalWidth > parentWidth) {
                    navItems[index].visible = false
                }
            })
        } else {
            if (parentWidth > originWidth) {
                children.forEach((ele: HTMLElement, index) => {
                    subTotalWidth += (ele.offsetWidth + childPadding)
                    if (subTotalWidth < parentWidth) {
                        navItems[index].visible = true
                    }
                })
            } else {
                children.forEach((ele: HTMLElement, index) => {
                    subTotalWidth += (ele.offsetWidth + childPadding)
                    if (subTotalWidth > parentWidth) {
                        navItems[index].visible = false
                    }
                })
            }
        }
        originWidth = parentWidth
    }
    navItemsResize(true)
    windowEvent.addEventListener('resize', () => navItemsResize())
})


// main
const avatar = ref('https://www.tsdy.club/git/manage/user/info/avatar/Tsdy')
const userInfo = reactive({
    name: 'Tsdy',
    bio: 'developing',
    organization: '无',
    position: '天津',
    link: 'http://www.html.com',
    twitter: 'Tsdy',
})
const isEdit = ref(false)
const tabName = ref(useRoute().query.tab)
function switchTab(name: string | undefined) {
    tabName.value = name
    console.log(tabName.value)
    navItems.forEach(item => {
        if (item.name.toLowerCase() === tabName.value) {
            item.selected = true
        } else {
            item.selected = false
        }
        if (item.name.toLowerCase() === 'overview') {
            if (tabName.value === undefined) {
                item.selected = true
            }
        }
    })
}
if (typeof tabName.value === 'string') {

    switchTab(tabName.value)
}
useRouter().afterEach((to, from) => {
    console.log(to, from)
    if (to.path === from.path) {
        if (typeof to.query.tab === 'string' || typeof to.query.tab === 'undefined') {
            switchTab(to.query.tab)
        }
    }
})
</script>

<style scoped>
</style>