export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await $fetch("http://localhost:20000/api/auth/login", {
    method: "post",
    body,
    headers: {
      "content-type": "application/json",
    },
  });
  return res;
});
