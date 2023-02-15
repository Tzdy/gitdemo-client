export default async function clientRequest<DTO>(
  callback: () => Promise<any>
): Promise<{ response: DTO; errMessage: string }> {
  const { data, error } = await callback();
  let errMessage: string = "";
  if (error.value) {
    const response = error.value.data;
    if (error.value.statusCode === 400) {
      errMessage = response.data
        .map((item: any) => Object.values(item.constraints).join(","))
        .join(",");
    } else if (error.value.statusCode === 401) {
      errMessage = response.message;
    } else {
      errMessage = "server error.";
    }
  }
  if (data.value.code !== 20000) {
    errMessage = data.value.message;
  }
  return {
    response: data.value,
    errMessage,
  };
}
