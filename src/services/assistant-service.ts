import { PaginatedResponseAssistantPublic } from "../data-contracts/data-contracts";
import { SkHeaders } from "../interfaces/skHeaders";

export const getAssistants: (
  assistantId: string,
  user: string,
  hash: string
) => Promise<PaginatedResponseAssistantPublic> = async (
  assistantId,
  user,
  hash
) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/assistants/`;
  const skHeaders: SkHeaders = {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: import.meta.env.VITE_APPLICATION,
  };
  return fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", ...skHeaders },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error("Error when fetching assistants");
    });
};

export const getAssistantById = async (
  assistantId: string,
  user: string,
  hash: string
) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/assistants/${assistantId}`;
  const skHeaders: SkHeaders = {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: import.meta.env.VITE_APPLICATION,
  };
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error("Error when fetching assistant");
    });
};

export const getAssistantSessions = async (
  assistantId: string,
  user: string,
  hash: string
) => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/assistants/${assistantId}/sessions/`;
  const skHeaders: SkHeaders = {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: import.meta.env.VITE_APPLICATION,
  };
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error("Error when fetching sessions");
    });
};

export const getAssistantSessionById = async (
  assistantId: string,
  sessionId: number,
  user: string,
  hash: string
) => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/assistants/${assistantId}/sessions/${sessionId}/`;
  const skHeaders: SkHeaders = {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: import.meta.env.VITE_APPLICATION,
  };
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error("Error when fetching session");
    });
};
