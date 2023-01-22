export declare class TreeCommitItem {
    commitUser: string;
    commitTime: Date;
    commitHash: string;
    commitContent: string;
    type: 'blob' | 'tree';
    hash: string;
    name: string;
    path: string;
}
export declare class ListRepoFileReqDto {
    username: string;
    repoName: string;
    branch: string;
    path?: string;
}
declare class ResData {
    list: Array<TreeCommitItem>;
}
export declare class ListRepoFileResDto {
    code: number;
    data: ResData;
}
export {};
