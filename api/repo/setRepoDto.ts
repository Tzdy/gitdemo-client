import { HttpResponse } from '../HttpResponse';
import { RepoType } from './share';
export class SetRepoReqDto {
  repoId: number;
  repoName?: string;
  type?: RepoType;
  about?: string;
  website?: string;
  languageId?: number;

  // 0 关闭。 1-6顺序
  isOverview?: number;
}
export class SetRepoResDto extends HttpResponse {}