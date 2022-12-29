export declare class TreeCommitItem {
    username: string;
    time: Date;
    commitHash: string;
    treeHash: string;
    comment: string;
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
