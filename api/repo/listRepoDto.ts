import { HttpResponse } from '../HttpResponse';
import { RepoDto, RepoType } from './share';
export enum ListRepoSortType {
  LAST_UPDATE = 0,
  NAME = 1,
  STAR = 2,
}
export class ListRepoReqDto {
  username: string;
  page: number;
  pageSize: number;
  repoType?: RepoType;
  sort?: ListRepoSortType;
  languageId?: number;
  keyword?: string;
  isOverview?: boolean;
}
class ListRepoResData {
  repoList: Array<RepoDto>;
}
export class ListRepoResDto extends HttpResponse {
  data: ListRepoResData;
}