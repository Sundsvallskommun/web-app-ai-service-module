import { createContext, useContext, useState } from "react";
import { AssistantPublic } from "../data-contracts/data-contracts";
import { AssistantWrapper } from "./assistant-context";

export interface AppContextInterface {
  user: string;
  setUser: (u: string) => void;
  hash: string;
  setHash: (h: string) => void;
  assistant?: AssistantPublic;
  setAssistant: (a: AssistantPublic) => void;
  assistantId: string;
  setAssistantId: (s: string) => void;
  sessionId: string;
  setSessionId: (s: string) => void;
}

export const AppContext = createContext<AppContextInterface>(null);

export function AppWrapper({ children }) {
  const [user, setUser] = useState<string>(null);
  const [hash, setHash] = useState<string>(null);
  const [assistant, setAssistant] = useState<AssistantPublic>(null);
  const [assistantId, setAssistantId] = useState<string>(null);
  const [sessionId, setSessionId] = useState<string>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: (u: string) => setUser(u),
        hash,
        setHash: (h: string) => setHash(h),
        assistant,
        setAssistant: (a: AssistantPublic) => setAssistant(a),
        assistantId,
        setAssistantId: (s: string) => setAssistantId(s),
        sessionId,
        setSessionId: (s: string) => setSessionId(s),
      }}
    >
      <AssistantWrapper>{children}</AssistantWrapper>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
