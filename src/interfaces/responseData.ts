export interface Reference {
  id: string;
  text: string | null;
  metadata: {
    url: string | null;
    title: string;
    embedding_model: string;
  };
  group_id: string;
}

export interface ResponseData {
  session_id: string;
  answer: string;
  references: Reference[];
  model: {
    name: string;
    nickname: string;
    family: string;
    token_limit: number;
    selectable: boolean;
  };
}
