import { HttpResponse } from '../HttpResponse';
export class RegisterReqDto {
  username: string;
  password: string;
}
export class RegisterResDto extends HttpResponse {}