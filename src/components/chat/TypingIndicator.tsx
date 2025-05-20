import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background shadow">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex max-w-[80%] flex-col gap-1">
        <div className="rounded-xl rounded-bl-sm bg-muted px-4 py-3 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="animate-pulse rounded-full bg-muted-foreground/70 h-1.5 w-1.5 delay-0"></span>
            <span className="animate-pulse rounded-full bg-muted-foreground/70 h-1.5 w-1.5 delay-150"></span>
            <span className="animate-pulse rounded-full bg-muted-foreground/70 h-1.5 w-1.5 delay-300"></span>
          </div>
        </div>
        <span className="px-1 text-xs text-muted-foreground">Thinking...</span>
      </div>
    </div>
  );
}