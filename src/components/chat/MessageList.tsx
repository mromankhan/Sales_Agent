/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message as MessageType } from "@/lib/types";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement> | any
}

export function MessageList({ messages, isTyping, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-secondary">
      <div className={cn("space-y-4", "animate-in fade-in slide-in-from-bottom-4 duration-500")}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}