import { HttpResponse } from '../HttpResponse';
export declare class CatRepoFileReqDto {
    username: string;
    repoName: string;
    branch: string;
    path: string;
}
declare class Data {
    size: number;
    value: string;
}
export declare class CatRepoFileResDto extends HttpResponse {
    data: Data;
}
export {};
