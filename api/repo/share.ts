export enum RepoType {
  PUBLIC = 0,
  PRIVATE = 1,
}
export enum ToggleState {
  ACTIVE = 0,
  PASSIVE = 1,
}
export class RepoDto {
  id: number;
  type: RepoType;
  repoName: string;
  createTime: number;
  starNum: number;
  isStar: number;
  isOverview: number;
  about: string;

  // 提交时间，不是commit time
  updateTime: number;

  // 创建仓库时为空
  language: string;
}