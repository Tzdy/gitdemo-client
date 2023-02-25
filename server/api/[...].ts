import HttpProxy from "http-proxy";
import { join } from "path";
const proxy = HttpProxy.createProxy();
export default defineEventHandler(async (event) => {
  // 只有传formData时event.node.res.addListener("close"会被触发。
  // proxyRequest传formData会大一倍，文件失效。
  if (event.node.req.headers["content-type"]?.includes("multipart/form-data")) {
    await new Promise((resolve) => {
      proxy.web(
        event.node.req,
        event.node.res,
        {
          ignorePath: true,
          target: join(
            useRuntimeConfig().public.apiBase,
            (event.node.req.url || "").replace(/^\/api/, "")
          ),
        },
        (err) => {
          console.log(err);
        }
      );
      event.node.res.addListener("close", () => {
        resolve(void 0);
      });
      event.node.res.addListener("error", () => {
        resolve(void 0);
      });
    });
  } else {
    return await proxyRequest(
      event,
      join(
        useRuntimeConfig().public.apiBase,
        (event.node.req.url || "").replace(/^\/api/, "")
      )
    );
  }
});
