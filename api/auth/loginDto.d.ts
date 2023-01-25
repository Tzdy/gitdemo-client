import { HttpResponse } from '../HttpResponse';
export declare class LoginReqDto {
    username: string;
    password: string;
}
declare class LoginResData {
    token: string;
}
export declare class LoginResDto extends HttpResponse {
    data?: LoginResData;
}
export {};
