import { RepoType } from "~~/api/repo/share";

export function formatRepoType(repoType: RepoType) {
  if (repoType === RepoType.PUBLIC) {
    return "Public";
  } else if (repoType === RepoType.PRIVATE) {
    return "Private";
  }
}
