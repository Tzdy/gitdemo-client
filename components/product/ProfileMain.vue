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
                        <BaseUnderlineNav :items="navItems" :selected-name="tabName" more-pos="top" />
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
                                    <div @click="onUploadAvatar" to="/Tsdy/info" aria-label="change your avatar."
                                        class="d-block" style="padding-bottom: 100%;"
                                        :class="{ 'tooltipped': isMyself, 'tooltipped-s': isMyself }">
                                        <img class="position-absolute avatar circle width-full height-full border color-bg-default"
                                            :src="avatarUrl" alt="">
                                    </div>
                                </div>
                                <div class="float-left col-12 py-3">
                                    <h1>
                                        <span class="f2 d-block overflow-hidden">
                                            {{ userInfo.username }}
                                        </span>
                                        <span class="f3 text-light d-block color-fg-muted">
                                            {{ userInfo.nickname }}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                            <!-- 个人信息展示和修改 -->
                            <div class="d-flex flex-column">
                                <BaseForm v-if="isEdit" :data="userInfo" class="position-relative flex-auto">
                                    <div class="mb-2">
                                        <label class="f5 d-block mb-1">Name</label>
                                        <input v-model="userInfoEdit.nickname" class="width-full form-control"
                                            placeholder="Name">
                                    </div>
                                    <div>
                                        <label class="f5 d-block mb-1">Bio</label>
                                        <textarea v-model="userInfoEdit.bio" class="form-control mb-1 width-full"
                                            placeholder="Add a bio" rows="3" data-input-max-length="160"></textarea>
                                        <p class="note">
                                            You can <strong>@mention</strong> other users and organizations to link to
                                            them.
                                        </p>
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="originzation" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm" v-model="userInfoEdit.org"
                                            placeholder="Company">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="position" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm"
                                            v-model="userInfoEdit.address" placeholder="Position">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="link" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm" v-model="userInfoEdit.link"
                                            placeholder="Link">
                                    </div>
                                    <div class="color-fg-muted mt-2 d-flex flex-items-center">
                                        <BaseSvgIcon class="octicon" name="twitter" :size="16" />
                                        <input class="ml-2 form-control flex-auto input-sm"
                                            v-model="userInfoEdit.twitter" placeholder="Twitter">
                                    </div>
                                    <div class="my-3">
                                        <!-- error options -->
                                        <div class="color-fg-danger my-3"></div>
                                        <button @click="onSubmitEdit" type="button"
                                            class="btn-primary btn-sm btn mr-1">Submit</button>
                                        <button @click="isEdit = false" type="reset" class="btn-sm btn">Cancel</button>
                                    </div>
                                </BaseForm>
                                <!-- 这里使用v-if是因为d-md-block是display: block !important -->
                                <div v-if="!isEdit" class="flex-column d-md-block">
                                    <div class="mb-3 f4">
                                        <div>{{ userInfo.bio }}</div>
                                    </div>
                                    <div class="mb-3">
                                        <button v-if="isMyself && !isEdit" @click="onOpenEdit" type="button"
                                            class="btn btn-block">Edit
                                            profile</button>
                                    </div>

                                    <ul class="list-style-none f5 color-fg-default">
                                        <li v-show="userInfo.org" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="originzation"
                                                :size="16" />
                                            <span>
                                                {{ userInfo.org }}
                                            </span>
                                        </li>
                                        <li v-show="userInfo.address" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="position"
                                                :size="16" />
                                            <span>
                                                {{ userInfo.address }}
                                            </span>
                                        </li>
                                        <li v-show="userInfo.link" class="width-full pt-1 hide-sm hide-md">
                                            <BaseSvgIcon class="octicon mr-2 color-fg-muted" name="link" :size="16" />
                                            <NuxtLink class="Link--primary" target="_blink" :to="userInfo.link">
                                                {{ userInfo.link }}</NuxtLink>
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
                    <BaseMobileUnderlineNav :items="navItems" :selected-name="tabName" />
                    <!-- main -->
                    <div v-if="tabName === 'overview'">
                        <ProductProfileMainOverview />
                    </div>
                    <div v-else-if="tabName === 'repositories'">
                        <ProductProfileMainRepository />
                    </div>
                </div>
            </div>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import type { UnderlineNavItem } from '@/components/base/UnderlineNav.vue';
import { getOtherInfo, uploadAvatar, setInfo } from '~~/api/auth';
import { join } from '~~/shared/path';
import { useAuth } from '~~/store/auth';

function onUploadAvatar() {
    if (!isMyself.value) {
        return
    }
    const formData = new FormData()
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.onchange = async function () {
        if (input.files) {
            formData.set('avatar', input.files[0])
        }
        const { data, errMessage } = await uploadAvatar(formData)
        if (!errMessage) {
            avatarVersion.value = data.v
            authStore.info && (authStore.info.avatar_version = data.v)
        }
    }
    input.click()
}

const isEdit = ref(false)
const authStore = useAuth()
const username = useRoute().params.username as string
const isMyself = computed(() => {
    return authStore.info && authStore.info.username === username
})
async function fetchUserInfo() {
    const { data, errMessage } = await getOtherInfo(username)
    if (!errMessage) {
        return data.info
    }
}

const userInfo = ref({
    id: -1,
    username: '',
    nickname: '',
    created_time: 0,
    avatar_version: -1,
    bio: '',
    org: '',
    address: '',
    link: '',
    twitter: '',
})

const userInfoEdit = ref({
    id: -1,
    username: '',
    nickname: '',
    created_time: 0,
    avatar_version: -1,
    bio: '',
    org: '',
    address: '',
    link: '',
    twitter: '',
})

function onOpenEdit() {
    isEdit.value = true
    userInfoEdit.value = {
        ...userInfo.value
    }
}

async function onSubmitEdit() {
    const { errMessage } = await setInfo(userInfoEdit.value)
    if (!errMessage) {
        userInfo.value = userInfoEdit.value
        isEdit.value = false
    }
}

const userInfoResData = (await useAsyncData(async () => {
    return await fetchUserInfo()
})).data.value

const avatarVersion = ref(-1)
// 用户不存在
if (!userInfoResData) {
    await navigateTo({
        name: '404',
        replace: true
    })
} else {
    userInfo.value = userInfoResData
    avatarVersion.value = userInfo.value.avatar_version
}


const avatarUrl = computed(() => {
    if (!userInfo.value) {
        return ''
    }
    return join(useRuntimeConfig().app.baseURL, '/api/public/avatar?id=' + userInfo.value.id + '&v=' + avatarVersion.value)
})

function switchTab(tab: string[] | string | undefined) {
    if (typeof tab === 'string') {
        tabName.value = tab
    } else if (typeof tab === 'undefined') {
        tabName.value = 'overview'
    }
}
const tabName = ref('')
switchTab(useRoute().query.tab as string)
useRouter().afterEach((to, from) => {
    if (to.path === from.path) {
        switchTab(to.query.tab as string)
    }
})
const navItems = reactive<UnderlineNavItem[]>([
    {
        name: 'Overview',
        query: '',
        icon: 'overview',
    },
    {
        name: 'Repositories',
        query: 'repositories',
        icon: 'repository',
        number: 18,
        replace: true,
    },
    {
        name: 'Projects',
        query: 'projects',
        icon: 'projects',
        number: 0,
    },
    {
        name: 'Packages',
        query: 'packages',
        icon: 'packages',
        number: 0
    },
    {
        name: 'Stars',
        query: 'stars',
        icon: 'star',
        number: 0,
    },
])

</script>

<style scoped>

</style>