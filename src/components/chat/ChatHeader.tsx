import { LucideBrain } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center h-14 px-4 md:px-6">
        <div className="flex items-center gap-2 font-medium">
          <LucideBrain className="h-5 w-5 text-primary" />
          <span>Sales Assistant</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
    </header>
  );
}
