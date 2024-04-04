import { SkHeaders } from "../interfaces/skHeaders";

export const batchQuery = async (
  query: string,
  assistantId: string,
  sessionId: string,
  user: string,
  hash: string
) => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/assistants/${assistantId}/sessions/${sessionId || ""}?stream=false`;
  const skHeaders: SkHeaders = {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: import.meta.env.VITE_APPLICATION,
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ body: query }),
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("401 Not authorized");
    }
    return res.json();
  });
};
