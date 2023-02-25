export function join(...argvs: string[]) {
  argvs = argvs.map((str) => {
    if (str[0] === "/") {
      str = str.slice(1);
    }
    if (str[str.length - 1] === "/") {
      str = str.slice(0, str.length - 1);
    }
    return str;
  });
  return `/${argvs.join("/")}`;
}

export function resolve(...argvs: string[]) {
  argvs.unshift(useRuntimeConfig().app.baseURL);
  argvs = argvs.map((str) => {
    if (str[0] === "/") {
      str = str.slice(1);
    }
    if (str[str.length - 1] === "/") {
      str = str.slice(0, str.length - 1);
    }
    return str;
  });
  return `/${argvs.join("/")}`;
}

export function gitHttpPath(username: string, repoName: string) {
  return join(useRuntimeConfig().public.gitBase, `${username}/${repoName}.git`);
}
