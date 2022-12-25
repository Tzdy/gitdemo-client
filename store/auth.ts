import { defineStore } from "pinia";
import { getInfo, login } from "~~/api/auth";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: "",
    info: {},
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
      console.log(token.value);
      const { data, errMessage } = await getInfo();
      if (!errMessage) {
        this.info = data.info;
      }
      return errMessage;
    },
  },
});
