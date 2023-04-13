import { HttpResponse } from '../HttpResponse';
export class CatRepoFileReqDto {
  username: string;
  repoName: string;

  // 可以是分支名或commitHash
  branch: string;
  path: string;
}
class Data {
  size: number;
  value: string;
}
export class CatRepoFileResDto extends HttpResponse {
  data: Data;
}