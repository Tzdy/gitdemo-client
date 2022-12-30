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
                    <BaseInput class="short" />
                </div>
            </div>

            <div>
                <div class="form-group">
                    <div class="form-group-header">
                        <label>Description <span class="note">(optional)</span></label>
                    </div>
                    <BaseInput class="long" />
                </div>

            </div>
            <hr>
        </div>
    </BaseContainer>
</template>

<script setup lang="ts">
import { useAuth } from '~~/store/auth';


const authStore = useAuth()

const userList = ref<Array<string>>([])

userList.value.push(authStore.info!.nickname)

const selectUser = ref<string>(userList.value[0])

function onSelectUser(user: string) {
    selectUser.value = user
}


</script>

<style scoped>

</style>