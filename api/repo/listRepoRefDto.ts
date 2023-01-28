import { HttpResponse } from '../HttpResponse';
export enum RefType {
  BRANCH = 0,
  TAG = 1,
}
export class ListRepoRefReqDto {
  username: string;
  repoName: string;
  type: RefType;
}
class RefItem {
  name: string;
  latestCommit: string;
}
class Data {
  list: RefItem[];
}
export class ListRepoRefResDto extends HttpResponse {
  data: Data;
}