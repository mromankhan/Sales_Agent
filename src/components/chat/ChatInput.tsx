"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSendMessage(message);
    setMessage("");
    
    // Focus back on textarea after sending
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-adjust height
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  return (
    <div className={cn(
      "sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm",
      "border-t border-border px-4 py-4 md:py-5 md:px-6"
    )}>
      <div className="mx-auto max-w-4xl relative flex items-end rounded-lg border bg-background shadow-sm focus-within:ring-1 focus-within:ring-primary">
        <Textarea
          ref={textareaRef}
          placeholder="Type your message..."
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "min-h-[52px] max-h-[150px] overflow-y-auto resize-none border-0 p-3 pr-12",
            "placeholder:text-muted-foreground focus-visible:ring-0",
            disabled && "opacity-70"
          )}
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          className={cn(
            "absolute bottom-1.5 right-1.5 h-9 w-9 shrink-0 rounded-full",
            "transition-all hover:bg-primary hover:text-primary-foreground",
            !message.trim() && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={!message.trim() || disabled}
          onClick={handleSend}
        >
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}


