function padStart(val: number, num: number) {
  return (val + "").padStart(num, "0");
}

export function repoUpdatedTime(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${padStart(date.getMonth() + 1, 2)}-${padStart(
    date.getDate(),
    2
  )}`;
}
