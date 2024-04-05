import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import { useCallback, useState } from "react";
import { useAppContext } from "../context/app.context";
import {
  ChatEntryReference,
  ChatHistory,
  ChatHistoryEntry,
  Origin,
} from "../interfaces/history";
import { ResponseData } from "../interfaces/responseData";
import { SkHeaders } from "../interfaces/skHeaders";
import { batchQuery } from "../services/query-service";

const MAX_REFERENCE_COUNT = 3;

function useChat() {
  const stream = import.meta.env.VITE_STREAM_DEFAULT === "true";
  const { assistantId, sessionId, setSessionId, user, hash } = useAppContext();
  const [history, setHistory] = useState<ChatHistory>([]);
  const [incoming, setIncoming] = useState([]);
  const [done, setDone] = useState(true);
  const [error, setError] = useState(null);

  const clearHistory = () => {
    setHistory([]);
  };

  const addHistoryEntry = (
    origin: Origin,
    text: string,
    id: string,
    references?: ChatEntryReference[]
  ) => {
    const historyEntry: ChatHistoryEntry = {
      origin: origin,
      text,
      id,
      ...(references && { references }),
    };
    setHistory((history: ChatHistory) => {
      return [...history, historyEntry];
    });
  };

  const streamQuery = useCallback(
    (query: string, assistantId: string, session_id: string, u, h) => {
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry("user", query, questionId);
      setDone(false);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/assistants/${assistantId}/sessions/${session_id || ""}?stream=true`;

      let _id;
      let references: ChatEntryReference[];

      const skHeaders: SkHeaders = {
        _skuser: u,
        _skassistant: assistantId,
        _skhash: h,
        _skapp: import.meta.env.VITE_APPLICATION,
      };

      fetchEventSource(url, {
        method: "POST",
        body: JSON.stringify({ body: query }),
        headers: {
          Accept: "text/event-stream",
          ...skHeaders,
        },
        openWhenHidden: true,
        onopen(res: Response) {
          setDone(false);
          if (res.ok && res.status === 200) {
            setHistory((history: ChatHistory) => {
              return [
                ...history,
                { origin: "assistant", text: "", id: answerId },
              ];
            });
          } else if (res.status >= 400) {
            setError(true);
            addHistoryEntry(
              "system",
              "Ett fel inträffade, assistenten gav inget svar.",
              answerId,
              []
            );
          }
          return Promise.resolve();
        },
        onmessage(event: EventSourceMessage) {
          let parsedData: ResponseData;
          try {
            parsedData = JSON.parse(event.data);
          } catch (error) {
            console.error("Error when parsing response as json. Returning.");
            return;
          }

          if (!sessionId) {
            _id = parsedData.session_id;
          }
          (references =
            parsedData.references
              ?.filter((r) => !!r.metadata.url)
              .map((r) => ({
                title: r.metadata.title || r.metadata.url,
                url: r.metadata.url,
              })) || []),
            setHistory((history: ChatHistory) => {
              const newHistory = [...history];
              const index = newHistory.findIndex(
                (chat) => chat.id === answerId
              );
              newHistory[index] = {
                origin: "assistant",
                text: history[index]?.text + parsedData.answer,
                id: answerId,
              };
              return newHistory;
            });
        },
        onclose() {
          if (!sessionId) {
            setSessionId(_id);
          }
          setHistory((history: ChatHistory) => {
            const newHistory = [...history];
            const index = newHistory.findIndex((chat) => chat.id === answerId);
            newHistory[index] = {
              origin: history[index]?.origin || "assistant",
              text: history[index]?.text || "",
              id: answerId,
              references: references?.slice(0, MAX_REFERENCE_COUNT),
            };
            return newHistory;
          });
          setHistory((history: ChatHistory) => {
            return history;
          });
          setDone(true);
        },
        onerror(err: unknown) {
          setError(true);
        },
      })
        .catch((error) => {
          setError(true);
          addHistoryEntry(
            "system",
            "Ett fel inträffade, assistenten gav inget svar.",
            answerId,
            []
          );
          setDone(true);
        })
        .finally(() => {
          setDone(true);
        });
    },
    []
  );

  const sendQuery = (query: string) => {
    if (!assistantId || !hash) {
      addHistoryEntry(
        "system",
        "Ett fel inträffade, assistenten gav inget svar.",
        "0",
        []
      );
      setDone(true);
      return;
    }
    setError(null);
    if (stream) {
      streamQuery(query, assistantId, sessionId, user, hash);
    } else {
      setDone(false);
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry("user", query, questionId);
      return batchQuery(query, assistantId, sessionId, user, hash)
        .then((res: ResponseData) => {
          if (!sessionId) {
            setSessionId(res.session_id);
          }
          addHistoryEntry(
            "assistant",
            res.answer,
            answerId,
            res.references?.slice(0, MAX_REFERENCE_COUNT).map((r) => ({
              title: r.metadata.title,
              url: r.metadata.url,
            })) || []
          );
          setDone(true);
          return res;
        })
        .catch((e) => {
          console.error("Error occured:", e);
          addHistoryEntry(
            "system",
            "Ett fel inträffade, assistenten gav inget svar.",
            answerId,
            []
          );
          setDone(true);
          setError(e);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
    incoming,
    done,
    error,
    sendQuery,
    setSessionId,
  };
}

export default useChat;
