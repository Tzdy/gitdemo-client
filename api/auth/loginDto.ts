import { HttpResponse } from '../HttpResponse';
export class LoginReqDto {
  username: string = '';
  password: string = '';
}
class LoginResData {
  token: string;
}
export class LoginResDto extends HttpResponse {
  data?: LoginResData;
}