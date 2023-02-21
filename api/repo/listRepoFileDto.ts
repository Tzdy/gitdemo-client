import { HttpResponse } from '../HttpResponse';
export class TreeCommitItem {
  commitUser: string;
  commitTime: string;
  commitHash: string;
  commitContent: string;
  type: 'blob' | 'tree';
  hash: string;
  name: string;
  path: string;
}
export class ListRepoFileReqDto {
  username: string;
  repoName: string;

  // 可以是分支名或commitHash
  branch: string;
  path?: string;
}
class ResData {
  list: Array<TreeCommitItem>;
}
export class ListRepoFileResDto extends HttpResponse {
  data: ResData;
}