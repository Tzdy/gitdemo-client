import { defineStore } from "pinia";
import { getOneRepo } from "~~/api/repo";
import { GetOneRepoResDto } from "~~/api/repo/getOneRepoDto";

export const useRepo = defineStore("repo", {
  state: () => ({
    repoInfo: null as null | GetOneRepoResDto["data"],
  }),
  actions: {
    async fetchRepo(username: string, repoName: string) {
      const { response, errMessage } = await getOneRepo({
        repoName,
        username,
      });
      if (!errMessage) {
        this.repoInfo = response.data;
      }
    },
  },
});
