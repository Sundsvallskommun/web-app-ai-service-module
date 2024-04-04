const get = (url: string) => {
  return fetch(url);
};

const post = (url: string, data: any) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { Accept: "application/json" },
  });
};

export { get, post };
