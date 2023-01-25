import { HttpResponse } from '../HttpResponse';
import { RepoDto, RepoType } from './share';
export declare enum ListRepoSortType {
    LAST_UPDATE = 0,
    NAME = 1,
    STAR = 2
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
declare class ListRepoResData {
    repoList: Array<RepoDto>;
}
export declare class ListRepoResDto extends HttpResponse {
    data: ListRepoResData;
}
export {};
