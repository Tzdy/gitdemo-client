import { HttpResponse } from '../HttpResponse';
import { RepoType } from './share';
export class CreateRepoReqDto {
  repoName: string;
  type: RepoType;
  about: string;
}
export class CreateRepoResDto extends HttpResponse {}