/* eslint-disable @typescript-eslint/no-explicit-any */
export enum MessageRole {
  User = "user",
  Assistant = "assistant",
  System = "system",
}

export interface Message {
  id: string;
  content: string;
  role: MessageRole | any;
  timestamp: Date | any;
}