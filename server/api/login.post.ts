export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await $fetch("/auth/login", {
    baseURL: useRuntimeConfig().public.apiBase,
    method: "post",
    body,
    headers: {
      "content-type": "application/json",
    },
  });
  return res;
});
