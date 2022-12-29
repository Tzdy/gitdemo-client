import { RepoType } from './share';
export declare class CreateRepoReqDto {
    repoName: string;
    type: RepoType;
    about: string;
}
export declare class CreateRepoResDto {
    code: number;
    message: string;
}
