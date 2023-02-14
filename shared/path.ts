export function join(a: string, b: string) {
  if (a[a.length - 1] === "/") {
    a = a.slice(0, a.length - 1);
  }
  if (b[0] === "/") {
    b = b.slice(1);
  }
  return a + "/" + b;
}

export function gitHttpPath(username: string, repoName: string) {
  return join(useRuntimeConfig().public.gitBase, `${username}/${repoName}.git`);
}
