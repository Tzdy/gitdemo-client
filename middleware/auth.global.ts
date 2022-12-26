import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 是否为混合并且在客户端侧（首次打开页面时，属于混合状态，服务端为false， 客户端为true）
  // 在页面中点击路由跳转属于非混合的，服务端不打印，客户端为false
  const authStore = useAuth();
  const token = useCookie("token");
  if (!useNuxtApp().isHydrating) {
    if (!authStore.info && token.value) {
      await authStore.getInfo();
    }
    if (authStore.info) {
      if (to.path.includes("login")) {
        return await navigateTo(
          { path: `/${authStore.info.username}` },
          {
            replace: true,
          }
        );
      }
    }
  }
});
