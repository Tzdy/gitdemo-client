import { HttpResponse } from '../HttpResponse';
export declare class GetOneRepoCommitReqDto {
    username: string;
    repoName: string;
    branch: string;
    commitHash?: string;
}
declare class Data {
    username: string;
    userId?: number;
    nickname?: string;
    hash: string;
    content: string;
    createTime: number;
}
export declare class GetOneRepoCommitResDto extends HttpResponse {
    data: Data;
}
export {};
