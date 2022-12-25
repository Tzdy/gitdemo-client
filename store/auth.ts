import { defineStore } from "pinia";
import { getInfo, login } from "~~/api/auth";

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  created_time: Date;
  avatar: string;
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
  actions: {
    async login(username: string, password: string) {
      const cookie = useCookie("token");
      const { data, errMessage } = await login(username, password);
      if (!errMessage) {
        this.token = data.token;
        cookie.value = this.token;
      }
      return errMessage;
    },
    async getInfo() {
      const token = useCookie("token");
      const { data, errMessage } = await getInfo();
      if (!errMessage) {
        this.info = data.info;
      } else {
        token.value = "";
      }
      return errMessage;
    },
  },
});
