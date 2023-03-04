export default async function clientRequest<DTO>(
  callback: () => Promise<any>
): Promise<{ response: DTO; errMessage: string }> {
  const { data, error } = await callback();
  let code = 20000;
  let response = null;
  let errMessage: string = "";
  if (error.value) {
    response = error.value.data;
    code = response.code;
    if (error.value.statusCode === 400) {
      errMessage = response.data
        .map((item: any) => Object.values(item.constraints).join(","))
        .join(",");
    } else if (error.value.statusCode === 401) {
      errMessage = response.message;
      navigateTo({
        name: "403",
        replace: true,
      });
    } else {
      errMessage = "server error.";
    }
  } else {
    code = data.value.code;
    response = data.value;
    if (code !== 20000) {
      errMessage = data.value.message;
    }
  }
  return {
    response,
    errMessage,
  };
}
