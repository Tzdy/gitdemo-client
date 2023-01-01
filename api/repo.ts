import { useAuth } from "~~/store/auth";
import { CreateRepoReqDto } from "./repo/createRepoDto";
import { ListRepoResDto } from "./repo/listRepoDto";
import { SetRepoReqDto, SetRepoResDto } from "./repo/setRepoDto";
import { RepoType } from "./repo/share";
import clientRequest from "./share";
export function listRepo(
  username: string,
  page: number,
  pageSize: number,
  isOverview?: boolean,
  repoType?: number,
  sort?: number,
  languageId?: number,
  keyword?: string
) {
  const authStore = useAuth();
  const headers: HeadersInit = {};
  username === authStore.info?.username &&
    (headers["authorization"] = authStore.token);
  return clientRequest<ListRepoResDto["data"]>(() =>
    useFetch("/api/repo/list_repo", {
      method: "post",
      headers,
      body: {
        username,
        page,
        pageSize,
        isOverview,
        repoType,
        sort,
        languageId,
        keyword,
      },
    })
  );
}

export function setRepo(
  repoId: number,
  repoName?: string,
  type?: RepoType,
  about?: string,
  website?: string,
  languageId?: number,
  isOverview?: number
) {
  const token = useCookie("token");
  return clientRequest<void>(() =>
    useFetch("/api/repo/set_repo", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body: {
        repoId,
        repoName,
        type,
        about,
        website,
        languageId,
        isOverview,
      } as SetRepoReqDto,
    })
  );
}

export function createRepo(repoName: string, type: RepoType, about: string) {
  const token = useCookie("token");
  return clientRequest<void>(() =>
    useFetch("/api/repo/create_repo", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body: {
        repoName,
        type,
        about,
      } as CreateRepoReqDto,
    })
  );
}
