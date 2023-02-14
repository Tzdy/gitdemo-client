import { HttpResponse } from '../HttpResponse';
import { RepoDto, RepoType } from './share';
class LanguageItem {
  languageId: number;
  language: string;
  fileNum: number;
}
export class GetOneRepoReqDto {
  username: string;
  repoName: string;
}
class Data extends RepoDto {
  website: string;
  defaultBranchName: string;
  languageAnalysis: LanguageItem[];
}
export class GetOneRepoResDto extends HttpResponse {
  data: Data;
}