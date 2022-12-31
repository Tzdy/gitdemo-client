export declare class InfoReqDto {
}
export declare class OtherInfoReqDto {
    username: string;
}
export declare class InfoDto {
    id: number;
    username: string;
    nickname: string;
    created_time: Date;
    avatar_version: number;
    bio: string;
    address: string;
    link: string;
    twitter: string;
}
declare class InfoResData {
    info: InfoDto;
}
export declare class InfoResDto {
    code: number;
    data: InfoResData;
}
export {};
