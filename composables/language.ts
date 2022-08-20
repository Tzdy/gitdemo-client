const languageColor: Record<string, string | undefined> = {
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  Css: "#563d7c",
  Vue: "#41b883",
  PHP: "#4F5D95",
};
const keyValue: Record<string, string | undefined> = {};
Object.keys(languageColor).forEach((key) => {
  keyValue[key.toLowerCase()] = key;
});

export function useLanguage() {
  return {
    format(color: string) {
      const key = keyValue[color.toLowerCase()];
      if (key) {
        return {
          name: key,
          color: languageColor[key],
        };
      } else {
        return {
          name: "Other",
          color: "#563d7c",
        };
      }
    },
  };
}
