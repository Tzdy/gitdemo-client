<template>
    <BaseContainer>
        <div class="container-md my-6 px-3 px-md-4 px-lg-5">
            <div class="Subhead mb-3">
                <h1 class="Subhead-heading">Create a new repository.</h1>
                <p class="Subhead-description">A repository contains all project files, including the revision
                    history.Already have a project
                    repository elsewhere? </p>
            </div>

            <div>
                <div class="form-group required d-inline-block">
                    <div class="form-group-header">
                        <label>Owner</label>
                    </div>
                    <BaseSelectMenu @select="onSelectUser" :title="selectUser" :default-item="userList[0]"
                        :items="userList" />
                </div>
                <span class="f2 mx-2" style="vertical-align: sub;">/</span>
                <div class="form-group required d-inline-block">
                    <div class="form-group-header">
                        <label>Repository name</label>
                    </div>
                    <BaseInput v-model="repoName" class="short" />
                </div>
            </div>

            <div>
                <div class="form-group">
                    <div class="form-group-header">
                        <label>Description <span class="note">(optional)</span></label>
                    </div>
                    <BaseInput v-model="repoAbout" class="long" />
                </div>
            </div>
            <hr>
            <div class="form-checkbox">
                <label @click="onSelectRepoType(RepoType.PUBLIC)">
                    <input :checked="repoType === RepoType.PUBLIC" class="mt-2" type="radio" name="repoType">
                    <span>Public</span>
                </label>
                <BaseSvgIcon class="octicon float-left color-fg-muted mt-1 mr-2" name="repository" :size="24" />
                <span class="note">
                    Anyone on the internet can see this repository. You choose who can commit.
                </span>
            </div>
            <div class="form-checkbox">
                <label @click="onSelectRepoType(RepoType.PRIVATE)">
                    <input :checked="repoType === RepoType.PRIVATE" class="mt-2" type="radio" name="repoType">
                    <span>Private</span>
                </label>
                <BaseSvgIcon class="octicon float-left color-fg-muted mt-1 mr-2" name="lock" :size="24" />
                <span class="note">
                    You choose who can see and commit to this repository.
                </span>
            </div>
            <hr>
            <BaseButton @click="onSubmit" type="primary" :disabled="submitDisabled">Create Repository</BaseButton>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { createRepo } from '~~/api/repo';
import { useAuth } from '~~/store/auth';

enum RepoType {
    PUBLIC = 0,
    PRIVATE = 1
}

const authStore = useAuth()

const userList = ref<Array<string>>([])

userList.value.push(authStore.info!.nickname)

const selectUser = ref<string>(userList.value[0])
const repoName = ref('')
const repoType = ref<RepoType>(RepoType.PUBLIC)
const repoAbout = ref('')
function onSelectUser(user: string) {
    selectUser.value = user
}

function onSelectRepoType(type: RepoType) {
    repoType.value = type
}
const $router = useRouter()

async function onSubmit() {
    await createRepo(repoName.value, repoType.value, repoAbout.value)
    $router.replace({
        path: authStore.info!.username,
        query: {
            tab: 'repositories'
        },
    })
}

const submitDisabled = computed(() => {
    if (!repoName.value) {
        return true
    }
})

</script>

<style scoped>

</style>