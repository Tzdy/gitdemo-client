import { HttpResponse } from '../HttpResponse';

// set info

export class SetInfoReqDto {
  nickname?: string;
  bio?: string;
  address?: string;
  link?: string;
  twitter?: string;
  org?: string;
}
export class SetInfoResDto extends HttpResponse {}