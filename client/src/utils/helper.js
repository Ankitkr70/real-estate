export const requestOptions = (method, data) => {
  return {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
