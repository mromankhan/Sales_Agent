import { Message as MessageType, MessageRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === MessageRole.User;

  return (
    <div
      className={cn(
        "flex items-end gap-2 animate-in slide-in-from-bottom-3 duration-300",
        isUser && "flex-row-reverse"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background shadow">
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex max-w-[80%] flex-col gap-1">
        <div
          className={cn(
            "rounded-xl px-4 py-2 shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}