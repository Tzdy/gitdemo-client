import { HttpResponse } from '../HttpResponse';
import { RepoDto } from './share';
declare class LanguageItem {
    languageId: number;
    language: string;
    fileNum: number;
}
export declare class GetOneRepoReqDto {
    username: string;
    repoName: string;
}
declare class Data extends RepoDto {
    website: string;
    languageAnalysis: LanguageItem[];
}
export declare class GetOneRepoResDto extends HttpResponse {
    data: Data;
}
export {};
