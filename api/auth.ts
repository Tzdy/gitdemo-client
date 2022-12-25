import clientRequest from "./share";

export function login(username: string, password: string) {
  return clientRequest(() =>
    useFetch("/api/login", {
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
    useFetch("/api/info", {
      method: "post",
      body: {
        token: token.value || "",
      },
    })
  );
}
