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
  return clientRequest(() =>
    useFetch("/api/repo/list_repo", {
      method: "post",
      headers: {
        authorization: token.value,
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
