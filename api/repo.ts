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
  const token = useCookie("token");
  return clientRequest<ListRepoResDto["data"]>(() =>
    useFetch("/api/repo/list_repo", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
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
