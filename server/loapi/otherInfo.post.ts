import request from "~~/shared/request";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await request({
    url: "/auth/other_info",
    method: "post",
    data: body,
  });
});
