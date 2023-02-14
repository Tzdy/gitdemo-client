import { defineStore } from "pinia";
import { getOneRepo, getOneRepoCommit, listRepoRef } from "~~/api/repo";
import { GetOneRepoCommitResDto } from "~~/api/repo/getOneRepoCommit";
import { GetOneRepoResDto } from "~~/api/repo/getOneRepoDto";
import { RefType } from "~~/api/repo/listRepoRefDto";

interface RefItem {
  name: string;
  latestCommit: string;
}

interface RepoRef {
  branchList: Array<RefItem>;
  tagList: Array<RefItem>;
}

export const useRepo = defineStore("repo", {
  state: () => ({
    repoInfo: null as null | GetOneRepoResDto["data"],
    refName: "",
    repoRef: {
      branchList: [],
      tagList: [],
    } as RepoRef,
    latestCommit: null as null | GetOneRepoCommitResDto["data"],
  }),
  actions: {
    async fetchRepo(username: string, repoName: string, refName: string) {
      const { response, errMessage } = await getOneRepo({
        repoName,
        username,
      });
      if (!errMessage) {
        this.repoInfo = response.data;
        // 当url中没有refName时，使用默认分支名
        if (this.repoInfo.defaultBranchName && refName === "") {
          this.refName = this.repoInfo.defaultBranchName;
        }
      }
    },

    async fetchLatestCommit(
      username: string,
      repoName: string,
      refName: string
    ) {
      if (!this.repoInfo?.defaultBranchName) {
        return;
      }
      const { response, errMessage } = await getOneRepoCommit({
        username,
        repoName,
        branch: refName,
      });
      if (!errMessage) {
        this.latestCommit = response.data;
      }
    },

    async fetchRef(username: string, repoName: string, type: RefType) {
      const { response, errMessage } = await listRepoRef({
        repoName,
        type,
        username,
      });
      if (!errMessage) {
        if (type === RefType.BRANCH) {
          this.repoRef.branchList = response.data.list;
        } else {
          this.repoRef.tagList = response.data.list;
        }
      }
    },
  },
});
