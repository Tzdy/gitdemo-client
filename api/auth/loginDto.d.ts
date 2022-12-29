export declare class LoginReqDto {
    username: string;
    password: string;
}
declare class LoginResData {
    token: string;
}
export declare class LoginResDto {
    code: number;
    data?: LoginResData;
}
export {};
