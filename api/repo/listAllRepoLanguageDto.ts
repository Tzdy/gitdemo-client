import { HttpResponse } from '../HttpResponse';
export class ListAllRepoLanguageReqDto {
  username: string;
}
class LanguageItem {
  id: number;
  name: string;
}
class ResData {
  languageList: Array<LanguageItem>;
}
export class ListAllRepoLanguageResDto extends HttpResponse {
  data: ResData;
}