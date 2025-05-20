"use client";
import React, { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Sidebar } from '@/components/chat/Sidebar';
// import AuthProtected from '@/HOC/AuthProtected';

const Chatbot = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    // <AuthProtected>
    <div className="flex h-screen bg-background">
      <Sidebar selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
      <main className="flex-1 overflow-hidden">
        {selectedChatId ? (
          <ChatInterface selectedChatId={selectedChatId} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select or start a chat
          </div>
        )}
      </main>
    </div>
    // </AuthProtected>
  );
};

export default Chatbot;
