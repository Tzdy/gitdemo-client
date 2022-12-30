<template>
    <BaseContainer>
        <div class="overwrite Header Details px-3 px-md-4 px-lg-5 flex-wrap flex-md-nowrap">
            <!-- Mobile -->
            <div class="Header-item d-md-none">
                <button type="button" class="Header-link btn-link">
                    <BaseSvgIcon class="octicon" name="menu" />
                </button>
            </div>
            <!-- Mobile -->
            <div class="Header-item Header-item--full d-md-none flex-justify-center">
                <NuxtLink to="/" class="Header-link f4 d-flex flex-items-center">
                    <BaseSvgIcon class="octicon mr-2" :size="32" name="logo" />
                </NuxtLink>
            </div>


            <!-- Desktop -->
            <div class="Header-item mt-n1 mb-n1  d-none d-md-flex">
                <NuxtLink to="/" class="Header-link">
                    <BaseSvgIcon class="octicon v-align-middle" :size="32" name="logo" />
                </NuxtLink>
            </div>
            <div
                class="Header-item overflow-hidden Header-item--full flex-column flex-md-row width-full flex-order-2 flex-md-order-none mr-0 mt-3 mt-md-0 d-md-flex">
                <!-- search -->
                <div @click.stop="searchBoxState = true"
                    :class="searchBoxState ? 'header-search-md-block' : 'header-search-md-common'"
                    class="Header-search header-md-search flex-shrink-1 flex-grow-0 flex-auto position-relative flex-self-stretch flex-md-self-auto mb-3 mb-md-0 mr-0 mr-md-3">
                    <form class="width-full header-search-input-wrap">
                        <BaseInput class="f5 Header-input header-search-input" size="block"
                            placeholder="Search or jump to..." />
                    </form>
                </div>
                <nav class="d-flex flex-self-stretch flex-md-self-auto flex-column flex-md-row">
                    <NuxtLink to="#" style="border-color: rgba(255,255,255,.15) !important;"
                        class="Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0">Pull
                        Request</NuxtLink>
                    <NuxtLink to="#" style="border-color: rgba(255,255,255,.15) !important;"
                        class="Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0">
                        Issues</NuxtLink>
                </nav>
            </div>
            <div v-if="userInfo" class="Header-item mr-0 mr-md-3 flex-order-1 flex-md-order-none">
                <NuxtLink to="/notify" aria-label="You have no unread notifications"
                    class="Header-link notification-indicator position-relative tooltipped tooltipped-sw">
                    <BaseSvgIcon class="octicon" :size="16" name="notify" />
                </NuxtLink>
            </div>
            <div v-if="userInfo" class="Header-item ml-auto d-none d-md-flex">
                <BaseDropDown :data="plusDropdownItems" class="Header-link">
                    <BaseSvgIcon class="mr-1 octicon v-align-middle" :size="16" name="plus" />
                </BaseDropDown>
            </div>
            <div class="Header-item mr-0 ml-auto d-none d-md-flex">
                <BaseDropDown class="Header-link" v-if="userInfo" :data="avatarDropdownItems">
                    <img class="avatar circle" height="20" alt="@octocat" :src="avatar" width="20" />
                </BaseDropDown>
                <NuxtLink v-else class="Header-link f4 text-bold" to="/login">SIGN IN</NuxtLink>
            </div>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useWindowEvent } from '~~/store';
import { useAuth } from '~~/store/auth';
const authStore = useAuth()

const userInfo = computed(() => {
    return authStore.info
})

const avatar = computed(() => {
    return authStore.avatar
})

const searchBoxState = ref(false)
const avatarDropdownItems = [{ name: 'profile', url: '/profile' }, [{ name: 'Upgrade', url: '/upgrade' }]]
const plusDropdownItems = [{ name: 'New repository', url: '/new' }]
onMounted(() => {
    const windowEvent = useWindowEvent()
    windowEvent.addEventListener('click', e => {
        searchBoxState.value = false;
    })
})
</script>

<style scoped lang="scss">
@import "@primer/css/support/index.scss";

.overwrite {
    & {
        .header-search-input-wrap {
            border: 1px #57606a solid;
            border-radius: 6px;
        }

        .header-search-input {
            display: table-cell;
            width: 100%;
            padding-top: 0;
            padding-bottom: 0;
            font-size: inherit;
            color: inherit;
            background: none;
            // 防止被外层
            border: 0;
            box-shadow: none;
            height: 26px;
        }

        @media screen and (min-width: $width-md) {
            .header-search-md-block {
                width: 542px;
            }

            .header-search-md-common {
                width: 272px;
            }

            .header-md-search {
                transition: width .3s;
            }

        }
    }
}
</style>