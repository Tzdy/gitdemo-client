<template>
    <div class="Box Box--spacious d-block">
        <div v-if="repoStore.repoInfo" class="Box-header Box-header--blue">
            <span class="input-group width-full">
                <input id="empty-setup-clone-url" type="text" readonly spellcheck="false"
                    class="form-control input-sm input-monospace" data-target="git-clone-help.helpField"
                    :value="gitHttpPath(username, reponame)" aria-label="Clone URL">
                <span class="input-group-button">
                    <label for="empty-setup-clone-url" aria-label="Copy to clipboard"
                        class="btn btn-sm zeroclipboard-button" role="button">
                        <BaseSvgIcon class="octicon" :size="16" name="copy" />
                    </label>
                </span>
            </span>
        </div>
        <div>
            <div class="Box-row"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { gitHttpPath } from '@/shared/path'
import { useRepo } from '~~/store/repo';
const username = useRoute().params.username as string
const reponame = useRoute().params.reponame as string
const repoStore = useRepo()
</script>

<style scoped>

</style>