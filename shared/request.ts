interface RequestOptions {
  url: string;
  method: string;
  params?: Record<string, string>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export default function request(options: RequestOptions) {
  const { url, method, headers, data, params } = options;
  return $fetch(url, {
    baseURL: useRuntimeConfig().public.apiBase,
    method,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    params,
    body: data,
  });
}
