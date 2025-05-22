'use client';
import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { Message, MessageRole } from "@/lib/types";
import axios from "axios";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { UseAuthStore } from "@/store/useAuthStore";

export function ChatInterface({ selectedChatId }: { selectedChatId: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = UseAuthStore();

  useEffect(() => {
    if (!user || !selectedChatId) return;

    const q = query(
      collection(db, 'users', user.uid, 'chats', selectedChatId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
    const msgs: Message[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Message[];

  // If no messages yet, show default assistant greeting
  if (msgs.length === 0) {
    setMessages([{
      id: "default",
      content: "Hello! I am a Sales Agent, How can I assist you today?",
      role: MessageRole.Assistant,
      timestamp: new Date(),
    }]);
  } else {
    setMessages(msgs);
  }
});


    return () => unsubscribe();
  }, [user, selectedChatId]);

const handleSendMessage = async (content: string) => {
  if (!user || !selectedChatId || !content.trim()) return;

  setIsTyping(true);
// https://5chgqvmq-8000.inc1.devtunnels.ms/
// http://localhost:8000/chat
  try {
    const response = await axios.post("https://5chgqvmq-8000.inc1.devtunnels.ms/chat", {
      message: content,
      uid: user.uid,
      chatId: selectedChatId,
    });

    const botReply = response.data.response;

    if (!botReply) {
      console.error("Invalid API response:", response.data);
    }

  } catch (error) {
    console.error("API error:", error);
  }

  setIsTyping(false);
};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
