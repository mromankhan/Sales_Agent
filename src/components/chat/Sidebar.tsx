// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/Button';
// import { ScrollArea } from '@/components/ui/ScrollArea';
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
// import { PlusCircle, Menu, MessageSquare } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface Conversation {
//   id: string;
//   title: string;
//   timestamp: string;
// }

// export function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  
//   // Example conversations - replace with real data
//   const conversations: Conversation[] = [
//     { id: '1', title: 'Getting Started', timestamp: '2024-03-20' },
//     { id: '2', title: 'Project Planning', timestamp: '2024-03-21' },
//     { id: '3', title: 'Technical Discussion', timestamp: '2024-03-22' },
//   ];

//   return (
//     <>
//       {/* Mobile Trigger */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetTrigger asChild>
//           <Button variant="ghost" className="md:hidden" size="icon">
//             <Menu className="h-6 w-6" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-[280px] p-0">
//           <SheetTitle className="sr-only">Sidebar</SheetTitle> 
//           <SidebarContent
//             conversations={conversations}
//             selectedConversation={selectedConversation}
//             setSelectedConversation={setSelectedConversation}
//           />
//         </SheetContent>
//       </Sheet>

//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex h-full w-[280px] flex-col border-r bg-muted/5">
//         <SidebarContent
//           conversations={conversations}
//           selectedConversation={selectedConversation}
//           setSelectedConversation={setSelectedConversation}
//         />
//       </div>
//     </>
//   );
// }

// function SidebarContent({
//   conversations,
//   selectedConversation,
//   setSelectedConversation,
// }: {
//   conversations: Conversation[];
//   selectedConversation: string | null;
//   setSelectedConversation: (id: string) => void;
// }) {
//   return (
//     <div className="flex h-full flex-col gap-2">
//       <div className="p-4 border-b">
//         <Button className="w-full justify-start gap-2" variant="secondary">
//           <PlusCircle className="h-4 w-4" />
//           New Chat
//         </Button>
//       </div>
//       <ScrollArea className="flex-1 p-2">
//         <div className="space-y-2">
//           {conversations.map((conversation) => (
//             <button
//               key={conversation.id}
//               onClick={() => setSelectedConversation(conversation.id)}
//               className={cn(
//                 'w-full flex items-center gap-2 rounded-lg p-3 text-sm transition-colors hover:bg-muted/50',
//                 selectedConversation === conversation.id && 'bg-muted'
//               )}
//             >
//               <MessageSquare className="h-4 w-4" />
//               <div className="flex-1 truncate text-left">{conversation.title}</div>
//             </button>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }














'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { PlusCircle, Menu, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { collection, getDocs, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import { UseAuthStore } from '@/store/useAuthStore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export interface Conversation {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  selectedChatId: string | null;
  setSelectedChatId: (id: string) => void;
}


export function Sidebar({ selectedChatId, setSelectedChatId }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = UseAuthStore((state) => state)

  useEffect(() => {
    if (!user) return;
    const fetchChats = async () => {
      const chatsRef = collection(db, 'users', user.uid, 'chats');
      const q = query(chatsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled Chat',
        timestamp: doc.data().createdAt?.toDate().toISOString() || '',
      }));
      setConversations(chats);
    };
    fetchChats();
  }, [user, selectedChatId]);

  const createNewChat = async () => {
    if (!user) return;
    const newChatRef = await addDoc(collection(db, 'users', user.uid, 'chats'), {
      title: 'New Chat',
      createdAt: serverTimestamp(),
    });
    setSelectedChatId(newChatRef.id);
  };

  return (
    <>
      {/* Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <SidebarContent
            conversations={conversations}
            selectedConversation={selectedChatId}
            setSelectedConversation={setSelectedChatId}
            onNewChat={createNewChat}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div className="hidden md:flex h-full w-[280px] flex-col border-r bg-muted/5">
        <SidebarContent
          conversations={conversations}
          selectedConversation={selectedChatId}
          setSelectedConversation={setSelectedChatId}
          onNewChat={createNewChat}
        />
      </div>
    </>
  );
}

function SidebarContent({
  conversations,
  selectedConversation,
  setSelectedConversation,
  onNewChat,
}: {
  conversations: Conversation[];
  selectedConversation: string | null;
  setSelectedConversation: (id: string) => void;
  onNewChat: () => void;
}) {

  const router = useRouter();

  
const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (e) {
    console.error("Logout error is", e);
  }
}


  return (
    <div className="flex h-full flex-col gap-2">
      <div className="p-4 border-b">
        <Button onClick={onNewChat} className="w-full cursor-pointer justify-start gap-2" variant="secondary">
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>

        <Button onClick={handleLogout} className="w-full cursor-pointer mt-4 bg-black justify-center gap-2" variant="ghost">
          Logout
        </Button>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={cn(
                'w-full flex items-center gap-2 rounded-lg p-3 cursor-pointer text-sm transition-colors hover:bg-muted/50',
                selectedConversation === conversation.id && 'bg-muted'
              )}
            >
              <MessageSquare className="h-4 w-4" />
              <div className="flex-1 truncate text-left">{conversation.title}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
