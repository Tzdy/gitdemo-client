export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const res = await $fetch("/auth/info", {
      baseURL: useRuntimeConfig().public.apiBase,
      method: "post",
      headers: {
        authorization: body.token,
      },
    });
    return res;
  } catch (err) {
    return err.data;
  }
});
