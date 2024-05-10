import { ReactNode, createContext, useContext, useState } from "react";
import { ChatHistory } from "../interfaces/history";
import { useAppContext } from "./app.context";

export interface IAssistantContext {
  history?: ChatHistory;
  setHistory: React.Dispatch<React.SetStateAction<ChatHistory>>;
  clearHistory: () => void;
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AssistantContext = createContext<IAssistantContext>(null);

export const useAssistant = () => useContext(AssistantContext);

export const AssistantWrapper: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [done, setDone] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const { setSessionId } = useAppContext();

  const clearHistory = () => {
    setHistory([]);
    setSessionId(null);
  };

  const context = {
    history,
    setHistory,
    clearHistory,
    done,
    setDone,
    error,
    setError,
  };

  return (
    <AssistantContext.Provider value={context}>
      {children}
    </AssistantContext.Provider>
  );
};
