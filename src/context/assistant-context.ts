import { createContext } from "react";
import { AssistantPublic } from "../data-contracts/data-contracts";

export interface IAssistantContext {
  assistant?: AssistantPublic;
  sessionId: number;
}

const ctx: IAssistantContext = {
  sessionId: null,
};

export const AssistantContext = createContext(ctx);
