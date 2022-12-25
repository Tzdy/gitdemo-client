import request from "~~/shared/request";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await request({
    url: "/auth/info",
    method: "post",
    headers: {
      authorization: body.token,
    },
  });
});
