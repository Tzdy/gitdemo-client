import { useAuth } from "~~/store/auth";
import { CatRepoFileReqDto, CatRepoFileResDto } from "./repo/catRepoFileDto";
import { CreateRepoReqDto } from "./repo/createRepoDto";
import {
  GetOneRepoCommitReqDto,
  GetOneRepoCommitResDto,
} from "./repo/getOneRepoCommit";
import { GetOneRepoReqDto, GetOneRepoResDto } from "./repo/getOneRepoDto";
import {
  ListAllRepoLanguageReqDto,
  ListAllRepoLanguageResDto,
} from "./repo/listAllRepoLanguageDto";
import { ListRepoResDto } from "./repo/listRepoDto";
import { ListRepoFileReqDto, ListRepoFileResDto } from "./repo/listRepoFileDto";
import { ListRepoRefReqDto, ListRepoRefResDto } from "./repo/listRepoRefDto";
import { SetRepoReqDto, SetRepoResDto } from "./repo/setRepoDto";
import { RepoType } from "./repo/share";
import { ToggleStarReqDto, ToggleStarResDto } from "./repo/toggleStarDto";
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
  return clientRequest<ListRepoResDto>(() =>
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

export function listAllRepoLanguage(username: string) {
  const authStore = useAuth();
  const headers: HeadersInit = {};
  username === authStore.info?.username &&
    (headers["authorization"] = authStore.token);
  return clientRequest<ListAllRepoLanguageResDto>(() =>
    useFetch("/api/repo/list_all_repo_language", {
      method: "post",
      headers,
      body: {
        username,
      } as ListAllRepoLanguageReqDto,
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

export function listRepoFile(body: ListRepoFileReqDto) {
  const token = useCookie("token");
  return clientRequest<ListRepoFileResDto>(() =>
    useFetch("/api/repo/list_repo_file", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}

export function catRepoFile(body: CatRepoFileReqDto) {
  const token = useCookie("token");
  return clientRequest<CatRepoFileResDto>(() =>
    useFetch("/api/repo/cat_repo_file", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}

export function getOneRepoCommit(body: GetOneRepoCommitReqDto) {
  const token = useCookie("token");
  return clientRequest<GetOneRepoCommitResDto>(() =>
    useFetch("/api/repo/get_one_repo_commit", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}

export function getOneRepo(body: GetOneRepoReqDto) {
  const token = useCookie("token");
  return clientRequest<GetOneRepoResDto>(() =>
    useFetch("/api/repo/get_one_repo", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}

export function listRepoRef(body: ListRepoRefReqDto) {
  const token = useCookie("token");
  return clientRequest<ListRepoRefResDto>(() =>
    useFetch("/api/repo/list_repo_ref", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}

export function toggleRepoStar(body: ToggleStarReqDto) {
  const token = useCookie("token");
  return clientRequest<void>(() =>
    useFetch("/api/repo/toggle_repo_star", {
      method: "post",
      headers: {
        authorization: token.value || "",
      },
      body,
    })
  );
}
