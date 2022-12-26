import clientRequest from "./share";

export function login(username: string, password: string) {
  return clientRequest(() =>
    useFetch("/api/proxy/auth/login", {
      method: "post",
      body: {
        username,
        password,
      },
    })
  );
}

export function getInfo() {
  const token = useCookie("token");
  return clientRequest(() =>
    useFetch("/api/proxy/auth/info", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
    })
  );
}

export function getOtherInfo(username: string) {
  const token = useCookie("token");
  return clientRequest(() =>
    useFetch("/api/proxy/auth/other_info", {
      method: "post",
      body: {
        username,
      },
    })
  );
}

export function uploadAvatar(formData: FormData) {
  const token = useCookie("token");
  return clientRequest(() =>
    useFetch("/api/proxy/auth/upload_info_avatar", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body: formData,
    })
  );
}
