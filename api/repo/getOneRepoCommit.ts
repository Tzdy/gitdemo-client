import { HttpResponse } from '../HttpResponse';
export class GetOneRepoCommitReqDto {
  username: string;
  repoName: string;
  branch: string;
  commitHash?: string;
}
class Data {
  username: string;
  userId?: number;
  nickname?: string;
  hash: string;
  content: string;
  createTime: number;
}
export class GetOneRepoCommitResDto extends HttpResponse {
  data: Data;
}