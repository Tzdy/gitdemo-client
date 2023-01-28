import { defineStore } from "pinia";
import { getInfo, login } from "~~/api/auth";
import { join } from "~~/shared/path";

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  created_time: Date;
  avatar_version: number;
  bio: string;
  address: string;
  link: string;
  twitter: string;
  repo_total_num: number;
  star_total_num: number;
}

export const useAuth = defineStore("auth", {
  state: () => ({
    token: "",
    info: null as null | UserInfo,
  }),
  getters: {
    avatar: (state) => {
      if (state.info) {
        return join(
          useRuntimeConfig().app.baseURL,
          "/api/public/avatar?id=" +
            state.info.id +
            "&v=" +
            state.info.avatar_version
        );
      }
      return "";
    },
  },
  actions: {
    async login(username: string, password: string) {
      const cookie = useCookie("token");
      const { response, errMessage } = await login(username, password);
      if (!errMessage) {
        this.token = response.data.token;
        cookie.value = this.token;
      }
      return errMessage;
    },
    async getInfo() {
      const token = useCookie("token");
      const { response, errMessage } = await getInfo();
      if (!errMessage) {
        this.info = response.data.info;
      } else {
        token.value = "";
      }
      return errMessage;
    },
  },
});
