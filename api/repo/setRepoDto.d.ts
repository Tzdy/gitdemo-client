import { HttpResponse } from '../HttpResponse';
import { RepoType } from './share';
export declare class SetRepoReqDto {
    repoId: number;
    repoName?: string;
    type?: RepoType;
    about?: string;
    website?: string;
    languageId?: number;
    isOverview?: number;
}
export declare class SetRepoResDto extends HttpResponse {
}
