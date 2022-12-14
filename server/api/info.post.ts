export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const res = await $fetch("http://localhost:20000/api/auth/info", {
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
