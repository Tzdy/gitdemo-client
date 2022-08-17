<template>
    <details class="d-none d-md-flex ml-2 position-relative">
        <summary class="btn-primary btn">
            <span>Code</span>
            <span class="dropdown-caret"></span>
        </summary>
        <div class="position-relative">
            <div class="dropdown-menu dropdown-menu-sw p-0" style="width: 376px; top: 6px">
                <ul class="list-style-none">
                    <li class="Box-row p-3">
                        <div class="text-bold">
                            <BaseSvgIcon name="console" :size="16" class="octicon mr-2" />
                            <span>Clone</span>
                        </div>
                        <BaseUnderlineTab @select="onSelect" :items="items" selected-name="HTTPS">
                            <template v-slot:HTTPS>
                                <BaseInputClip :copy-text="httpsUrl" />
                                <p class="mt-2 mb-0 f6 color-fg-muted">Use Git or checkout with SVN using the web URL.
                                </p>
                            </template>
                            <template v-slot:SSH>
                                <div class="f6 flash flash-warn mt-2 mb-3 p-3">
                                    <span>You don't have any public SSH keys in your GitHub account.
                                        You can</span>
                                    <a href="">add a new public key</a>
                                    <span>, or try cloning this repository via HTTPS.</span>
                                </div>
                                <BaseInputClip :copy-text="sshUrl" />
                                <p class="mt-2 mb-0 f6 color-fg-muted">Use a password-protected SSH key.</p>
                            </template>
                        </BaseUnderlineTab>
                    </li>
                    <li class="Box-row Box-row--hover-gray p-3 mt-0">
                        <div style="cursor: pointer" class="d-flex flex-items-center color-fg-default text-bold">
                            <BaseSvgIcon name="zip" :size="16" class="octicon mr-2" />
                            <span>Download ZIP</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </details>
</template>

<script setup lang="ts">
const props = defineProps({
    httpsUrl: {
        type: String,
    },
    sshUrl: {
        type: String
    }
})
const items = [
    "HTTPS", "SSH"
]
function onSelect(tabName: string) {
    console.log(tabName)
}
</script>

<style scoped>
</style>