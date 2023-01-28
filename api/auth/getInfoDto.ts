import { HttpResponse } from '../HttpResponse';
export class InfoReqDto {}
export class OtherInfoReqDto {
  username: string;
}
export class InfoDto {
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
class InfoResData {
  info: InfoDto;
}
export class InfoResDto extends HttpResponse {
  data: InfoResData;
}