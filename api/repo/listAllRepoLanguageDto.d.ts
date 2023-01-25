import { HttpResponse } from '../HttpResponse';
export declare class ListAllRepoLanguageReqDto {
    username: string;
}
declare class LanguageItem {
    id: number;
    name: string;
}
declare class ResData {
    languageList: Array<LanguageItem>;
}
export declare class ListAllRepoLanguageResDto extends HttpResponse {
    data: ResData;
}
export {};
