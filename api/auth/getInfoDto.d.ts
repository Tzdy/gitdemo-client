import { HttpException } from '@tsdy/express-plugin-exception';
export declare class InfoReqDto {
}
export declare class OtherInfoReqDto {
    username: string;
}
export declare class InfoDto {
    id: number;
    username: string;
    nickname: string;
    created_time: number;
    avatar_version: number;
    bio: string;
    org: string;
    address: string;
    link: string;
    twitter: string;
}
declare class InfoResData {
    info: InfoDto;
}
export declare class InfoResDto extends HttpException {
    data: InfoResData;
}
export {};
