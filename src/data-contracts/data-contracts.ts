/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AccessToken */
export interface AccessToken {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
}

/** ApiKey */
export interface ApiKey {
  /** Truncated Key */
  truncated_key: string;
  /** Key */
  key: string;
}

/** ApiKeyInDB */
export interface ApiKeyInDB {
  /** Truncated Key */
  truncated_key: string;
  /** Key */
  key: string;
  /** User Id */
  user_id: number | null;
  /** Assistant Id */
  assistant_id: number | null;
}

/** AskAnalysis */
export interface AskAnalysis {
  /** Question */
  question: string;
  /**
   * Completion Model
   * @default "gpt-3.5-turbo-16k"
   */
  completion_model?: string;
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
}

/** AskAssistant */
export interface AskAssistant {
  /** Question */
  question: string;
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
}

/** AskResponse */
export interface AskResponse {
  /**
   * Session Id
   * @format uuid
   */
  session_id: string;
  /** Answer */
  answer: string;
  /** References */
  references: InfoBlobPublicNoText[];
  model: CompletionModel;
}

/** AssistantCreatePublic */
export interface AssistantCreatePublic {
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /**
   * Logging Enabled
   * @default false
   */
  logging_enabled?: boolean;
  /**
   * Groups
   * @default []
   */
  groups?: GroupId[] | null;
}

/** AssistantPublic */
export interface AssistantPublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /** Groups */
  groups: GroupPublic[];
  /** Logging Enabled */
  logging_enabled: boolean;
}

/** AssistantUpsertPublic */
export interface AssistantUpsertPublic {
  /** Name */
  name?: string;
  /** Prompt */
  prompt?: string;
  /** Completion Model */
  completion_model?: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /**
   * Logging Enabled
   * @default false
   */
  logging_enabled?: boolean;
  /**
   * Groups
   * @default []
   */
  groups?: GroupId[] | null;
}

/** Body_Login_api_v1_users_login_token__post */
export interface BodyLoginApiV1UsersLoginTokenPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
  client_secret?: string | null;
}

/** Body_upload_files_api_v1_groups__id__info_blobs_upload_files__post */
export interface BodyUploadFilesApiV1GroupsIdInfoBlobsUploadFilesPost {
  /** Files */
  files: File[];
}

/** CompletionModel */
export interface CompletionModel {
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  family: InstorageAiModelsCompletionModelsLlmsModelFamily;
  /** Token Limit */
  token_limit: number;
  /** Selectable */
  selectable: boolean;
}

/** Counts */
export interface Counts {
  /** Assistants */
  assistants: number;
  /** Sessions */
  sessions: number;
  /** Questions */
  questions: number;
}

/** CreateGroupRequest */
export interface CreateGroupRequest {
  /** Name */
  name: string;
  /**
   * Is Public
   * @default false
   */
  is_public?: boolean;
  /** Embedding Model */
  embedding_model?: string;
}

/** DeleteGroupResponse */
export interface DeleteGroupResponse {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Is Public */
  is_public: boolean;
  /** Embedding Model */
  embedding_model: string;
  deletion_info: DeletionInfo;
}

/** DeleteResponse */
export interface DeleteResponse {
  /** Success */
  success: boolean;
}

/** DeletionInfo */
export interface DeletionInfo {
  /** Success */
  success: boolean;
}

/** EmbeddingModel */
export interface EmbeddingModel {
  /** Name */
  name: string;
  family: InstorageAiModelsEmbeddingModelsEmbeddingModelsModelFamily;
  /** Open Source */
  open_source: boolean;
  /** Selectable */
  selectable: boolean;
}

/** GeneralError */
export interface GeneralError {
  /** Message */
  message: string;
}

/** GetModelsResponse */
export interface GetModelsResponse {
  /** Completion Models */
  completion_models: CompletionModel[];
  /** Embedding Models */
  embedding_models: EmbeddingModel[];
}

/** GroupId */
export interface GroupId {
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** GroupMetadata */
export interface GroupMetadata {
  /** Num Info Blobs */
  num_info_blobs: number;
}

/** GroupPublic */
export interface GroupPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Is Public */
  is_public: boolean;
  /** Embedding Model */
  embedding_model: string;
}

/** GroupPublicWithMetadata */
export interface GroupPublicWithMetadata {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Is Public */
  is_public: boolean;
  /** Embedding Model */
  embedding_model: string;
  metadata: GroupMetadata;
}

/** GroupUpdatePublic */
export interface GroupUpdatePublic {
  /** Name */
  name?: string;
  /** Is Public */
  is_public?: boolean;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** InfoBlobAddPublic */
export interface InfoBlobAddPublic {
  /** Text */
  text: string;
  metadata?: InfoBlobMetadataUpsertPublic;
}

/** InfoBlobMetadata */
export interface InfoBlobMetadata {
  /** Url */
  url?: string | null;
  /** Title */
  title?: string | null;
  /** Embedding Model */
  embedding_model: string;
}

/** InfoBlobMetadataUpsertPublic */
export interface InfoBlobMetadataUpsertPublic {
  /** Url */
  url?: string | null;
  /** Title */
  title?: string | null;
}

/** InfoBlobPublic */
export interface InfoBlobPublic {
  /** Id */
  id: string;
  metadata: InfoBlobMetadata;
  /**
   * Group Id
   * @format uuid
   */
  group_id: string;
  /** Text */
  text: string;
}

/** InfoBlobPublicNoText */
export interface InfoBlobPublicNoText {
  /** Id */
  id: string;
  metadata: InfoBlobMetadata;
  /**
   * Group Id
   * @format uuid
   */
  group_id: string;
}

/** InfoBlobUpdatePublic */
export interface InfoBlobUpdatePublic {
  metadata: InfoBlobMetadataUpsertPublic;
}

/** InfoBlobUpsertRequest */
export interface InfoBlobUpsertRequest {
  /** Info Blobs */
  info_blobs: InfoBlobAddPublic[];
}

/** LoggingDetailsPublic */
export interface LoggingDetailsPublic {
  /** Context */
  context?: string | null;
  /** Model Kwargs */
  model_kwargs: object;
  /** Json Body */
  json_body: any;
}

/** Message */
export interface Message {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Question */
  question: string;
  /** Answer */
  answer: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  completion_model: CompletionModel;
  /** References */
  references: InfoBlobPublicNoText[];
}

/** MessageLogging */
export interface MessageLogging {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Question */
  question: string;
  /** Answer */
  answer: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  completion_model: CompletionModel;
  /** References */
  references: InfoBlobPublicNoText[];
  logging_details: LoggingDetailsPublic;
}

/** ModuleBase */
export interface ModuleBase {
  name: Modules;
}

/** ModuleId */
export interface ModuleId {
  /** Id */
  id: number;
}

/** ModuleInDB */
export interface ModuleInDB {
  /** Id */
  id: number;
  name: Modules;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
}

/** Modules */
export type Modules = "logging";

/** OIDCProviders */
export type OIDCProviders = "mobility_guard";

/** OpenIdConnectLogin */
export interface OpenIdConnectLogin {
  /** Code */
  code: string;
  /** Code Verifier */
  code_verifier: string;
  /** Redirect Uri */
  redirect_uri: string;
  /**
   * Client Id
   * @default "intric"
   */
  client_id?: string;
  /**
   * Grant Type
   * @default "authorization_code"
   */
  grant_type?: string;
  /**
   * Scope
   * @default "openid"
   */
  scope?: string;
  /** Nonce */
  nonce?: string;
}

/** PaginatedResponse[AssistantPublic] */
export interface PaginatedResponseAssistantPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: AssistantPublic[];
}

/** PaginatedResponse[GroupPublicWithMetadata] */
export interface PaginatedResponseGroupPublicWithMetadata {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: GroupPublicWithMetadata[];
}

/** PaginatedResponse[InfoBlobPublicNoText] */
export interface PaginatedResponseInfoBlobPublicNoText {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: InfoBlobPublicNoText[];
}

/** PaginatedResponse[InfoBlobPublic] */
export interface PaginatedResponseInfoBlobPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: InfoBlobPublic[];
}

/** PaginatedResponse[Message] */
export interface PaginatedResponseMessage {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: Message[];
}

/** PaginatedResponse[ModuleInDB] */
export interface PaginatedResponseModuleInDB {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: ModuleInDB[];
}

/** PaginatedResponse[ServicePublic] */
export interface PaginatedResponseServicePublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: ServicePublic[];
}

/** PaginatedResponse[ServiceRun] */
export interface PaginatedResponseServiceRun {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: ServiceRun[];
}

/** PaginatedResponse[SessionMetadataPublic] */
export interface PaginatedResponseSessionMetadataPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: SessionMetadataPublic[];
}

/** PaginatedResponse[TenantInDB] */
export interface PaginatedResponseTenantInDB {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: TenantInDB[];
}

/** PaginatedResponse[UserInDB] */
export interface PaginatedResponseUserInDB {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: UserInDB[];
}

/** RunService */
export interface RunService {
  /** Input */
  input: string;
}

/** ServiceCreatePublic */
export interface ServiceCreatePublic {
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /**
   * Logging Enabled
   * @default false
   */
  logging_enabled?: boolean;
  /**
   * Groups
   * @default []
   */
  groups?: GroupId[] | null;
  /** Output Format */
  output_format?: ServiceCreatePublicOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
}

/** ServiceOutput */
export interface ServiceOutput {
  /** Output */
  output: object | any[] | string;
}

/** ServicePublic */
export interface ServicePublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /** Groups */
  groups: GroupPublic[];
  /** Logging Enabled */
  logging_enabled: boolean;
  /** Output Format */
  output_format?: ServicePublicOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
}

/** ServiceRun */
export interface ServiceRun {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Input */
  input: string;
  /** Output */
  output: object | any[] | string;
  completion_model: CompletionModel;
  /** References */
  references: InfoBlobPublic[];
}

/** ServiceUpsertPublic */
export interface ServiceUpsertPublic {
  /** Name */
  name?: string | null;
  /** Prompt */
  prompt?: string | null;
  /** Completion Model */
  completion_model?: string | null;
  /** Completion Model Kwargs */
  completion_model_kwargs?: object | null;
  /** Logging Enabled */
  logging_enabled?: boolean | null;
  /** Groups */
  groups?: GroupId[] | null;
  /** Output Format */
  output_format?: ServiceUpsertPublicOutputFormatEnum | null;
  /** Json Schema */
  json_schema?: object | null;
}

/** SessionMetadataPublic */
export interface SessionMetadataPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** SessionPublic */
export interface SessionPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /** Name */
  name: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Messages
   * @default []
   */
  messages?: Message[];
}

/** SettingsPublic */
export interface SettingsPublic {
  /**
   * Chatbot Widget
   * @default {}
   */
  chatbot_widget?: object;
}

/** TenantBase */
export interface TenantBase {
  /** Name */
  name: string;
  /**
   * Default Embedding Model
   * @default "text-embedding-ada-002"
   */
  default_embedding_model?: string;
}

/** TenantInDB */
export interface TenantInDB {
  /** Id */
  id: number;
  /**
   * Uuid
   * @format uuid
   */
  uuid: string;
  /** Name */
  name: string;
  /**
   * Default Embedding Model
   * @default "text-embedding-ada-002"
   */
  default_embedding_model?: string;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Modules
   * @default []
   */
  modules?: ModuleInDB[];
  /** Alphanumeric */
  alphanumeric: string;
}

/** UserAddPublic */
export interface UserAddPublic {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /** Tenant Id */
  tenant_id: number;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Quota Size
   * Size in bytes
   */
  quota_size?: number | null;
  /** If intended to be used with a Open ID Provider */
  created_with?: OIDCProviders | null;
}

/** UserCreated */
export interface UserCreated {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Id */
  id?: number | null;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /** Salt */
  salt: string;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /** Tenant Id */
  tenant_id: number;
  /** Quota Size */
  quota_size?: number | null;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  created_with?: OIDCProviders | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  tenant: TenantInDB;
  api_key: ApiKey | null;
  access_token: AccessToken | null;
  /** Modules */
  modules: string[];
}

/**
 * UserInDB
 * Add in created_at, updated_at
 */
export interface UserInDB {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Id */
  id?: number | null;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /** Salt */
  salt: string;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /** Tenant Id */
  tenant_id: number;
  /** Quota Size */
  quota_size?: number | null;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  created_with?: OIDCProviders | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  tenant: TenantInDB;
  api_key?: ApiKeyInDB | null;
  /** Modules */
  modules: string[];
}

/** UserPublicNoAccessToken */
export interface UserPublicNoAccessToken {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Truncated Api Key */
  truncated_api_key?: string | null;
}

/** UserUpdatePublic */
export interface UserUpdatePublic {
  /** Email */
  email?: string | null;
  /** Username */
  username?: string | null;
  /** Password */
  password?: string | null;
  /** Quota Size */
  quota_size?: number | null;
  /** Is Superuser */
  is_superuser?: boolean | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** ModelFamily */
export enum InstorageAiModelsCompletionModelsLlmsModelFamily {
  Openai = "openai",
  GptSw3 = "gpt-sw3",
  Llama = "llama",
  AlpacaTunedTgiHosted = "alpaca-tuned-tgi-hosted",
}

/** ModelFamily */
export enum InstorageAiModelsEmbeddingModelsEmbeddingModelsModelFamily {
  Openai = "openai",
  MiniLm = "mini_lm",
  E5 = "e5",
}

export enum ServiceCreatePublicOutputFormatEnum {
  Json = "json",
  List = "list",
}

export enum ServicePublicOutputFormatEnum {
  Json = "json",
  List = "list",
}

export enum ServiceUpsertPublicOutputFormatEnum {
  Json = "json",
  List = "list",
}
