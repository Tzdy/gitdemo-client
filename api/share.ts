export default async function clientRequest<DTO>(
  callback: () => Promise<any>
): Promise<{ data: DTO; errMessage: string }> {
  const { data, error } = await callback();
  let errMessage: string = "";
  if (error.value) {
    const response = error.value.data;
    if (error.value.statusCode === 400) {
      errMessage = response.data
        .map((item) => Object.values(item.constraints).join(","))
        .join(",");
    } else if (error.value.statusCode === 401) {
      errMessage = response.message;
    } else {
      errMessage = "server error.";
    }
  } else {
    const response = data.value;
    if (response.code !== 20000) {
      errMessage = response.message;
    }
  }
  return {
    data: data.value && data.value.data,
    errMessage,
  };
}
