import clientRequest from "./share";
import type { InfoResDto } from "./auth/getInfoDto";
import type { UploadAvatarResDto } from "./auth/uploadAvatarDto";
import { SetInfoReqDto, SetInfoResDto } from "./auth/setInfoDto";

export function login(username: string, password: string) {
  return clientRequest(() =>
    useFetch("/api/auth/login", {
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
  return clientRequest<InfoResDto>(() =>
    useFetch("/api/auth/info", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
    })
  );
}

export function getOtherInfo(username: string) {
  const token = useCookie("token");
  return clientRequest<InfoResDto>(() =>
    useFetch("/api/auth/other_info", {
      method: "post",
      body: {
        username,
      },
    })
  );
}

export function setInfo(info: SetInfoReqDto) {
  const token = useCookie("token");
  return clientRequest<void>(() =>
    useFetch("/api/auth/set_info", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body: info,
    })
  );
}

export function uploadAvatar(formData: FormData) {
  const token = useCookie("token");
  return clientRequest<UploadAvatarResDto>(() =>
    useFetch("/api/auth/upload_info_avatar", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body: formData,
    })
  );
}
