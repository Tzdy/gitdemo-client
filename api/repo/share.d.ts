export declare enum RepoType {
    PUBLIC = 0,
    PRIVATE = 1
}
export declare class RepoDto {
    id: number;
    type: RepoType;
    repoName: string;
    createTime: number;
    starNum: number;
    isOverview: number;
    about: string;
    updateTime: number;
    language: string;
}
