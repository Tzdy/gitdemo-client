import { HttpResponse } from '../HttpResponse';
export declare enum RefType {
    BRANCH = 0,
    TAG = 1
}
export declare class ListRepoRefReqDto {
    username: string;
    repoName: string;
    type: RefType;
}
declare class RefItem {
    name: string;
    latestCommit: string;
}
declare class Data {
    list: RefItem[];
}
export declare class ListRepoRefResDto extends HttpResponse {
    data: Data;
}
export {};
