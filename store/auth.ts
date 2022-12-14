import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: "",
    info: {},
  }),
  actions: {
    async login(username: string, password: string) {
      const cookie = useCookie("token");
      const { data, error } = await useFetch("/api/login", {
        method: "post",
        body: {
          username,
          password,
        },
      });
      let errMessage: string = "";
      if (error.value) {
        const response = error.value.data.data;
        if (error.value.statusCode === 400) {
          errMessage = response.data
            .map((item) => Object.values(item.constraints).join(","))
            .join(",");
        } else if (error.value.statusCode === 401) {
          errMessage = response.message;
        }
      } else {
        const response = data.value;
        if (response.code === 20000) {
          this.token = response.data.token;
          cookie.value = this.token;
        } else {
          errMessage = response.message;
        }
      }
      return errMessage;
    },
    async getInfo() {
      const token = useCookie("token");
      if (token.value) {
        const response = await $fetch("/api/info", {
          method: "post",
          body: {
            token: token.value,
          },
        });
        if (response.code === 20000) {
          this.info = response.data.info;
        }
      }
    },
  },
});
