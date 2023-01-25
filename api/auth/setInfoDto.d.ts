import { HttpResponse } from '../HttpResponse';
export declare class SetInfoReqDto {
    nickname?: string;
    bio?: string;
    address?: string;
    link?: string;
    twitter?: string;
    org?: string;
}
export declare class SetInfoResDto extends HttpResponse {
}
