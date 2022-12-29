import { RepoType } from './share';
export declare class SetRepoReqDto {
    repoName?: string;
    type?: RepoType;
    about?: string;
    website?: string;
    languageId?: number;
}
export declare class SetRepoResDto {
    code: number;
    message: string;
}
