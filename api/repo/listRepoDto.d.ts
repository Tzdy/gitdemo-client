import { RepoType } from "./share";
export declare enum ListRepoSortType {
  LAST_UPDATE = 0,
  NAME = 1,
  STAR = 2,
}
export declare class ListRepoReqDto {
  username: string;
  page: number;
  pageSize: number;
  repoType?: RepoType;
  sort?: ListRepoSortType;
  languageId?: number;
  keyword?: string;
  isOverview?: boolean;
}
export declare class RepoDto {
  id: number;
  type: RepoType;
  repo_name: string;
  create_time: number;
  star_num: number;
  is_overview: number;
  about: string;
  update_time: number;
  language: string;
}
declare class ListRepoResData {
  repoList: Array<RepoDto>;
}
export declare class ListRepoResDto {
  code: number;
  message: string;
  data: ListRepoResData;
}
export {};
