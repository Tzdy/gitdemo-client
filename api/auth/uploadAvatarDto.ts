import { HttpResponse } from '../HttpResponse';
export class UploadAvatarReqDto {}
class Data {
  v: number;
}
export class UploadAvatarResDto extends HttpResponse {
  data: Data;
}