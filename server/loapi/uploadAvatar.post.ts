import { join } from "~~/shared/path";
import HttpProxy from "http-proxy";
const proxy = HttpProxy.createProxy();
export default defineEventHandler(async (event) => {
  proxy.web(event.node.req, event.node.res, {
    ignorePath: true,
    target: join(useRuntimeConfig().public.apiBase, "/auth/upload_info_avatar"),
  });

  await new Promise((resolve) => {
    event.node.res.on("close", () => resolve(void 0));
  });
});
