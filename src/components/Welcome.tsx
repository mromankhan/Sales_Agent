"use client";
import { useState } from 'react';
import { MessageCircle, Moon, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WelcomeComponent() {
  const [hovering, setHovering] = useState(false);
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
              <MessageCircle size={32} className="text-white" />
              <div className="absolute -right-1 -top-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Moon size={14} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            Welcome to Sales Agent
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Your intelligent Sales Assistant
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold">Smart Conversations</h3>
            </div>
            <p className="text-gray-300">Experience intelligent interactions with our advanced Sales assistant</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            className="px-8 py-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full flex items-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            onClick={()=>{router.push("/signin")}}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <span className="text-lg">Get Started</span>
            <ArrowRight 
              size={20} 
              className={`transition-transform duration-300 ${hovering ? 'transform translate-x-1' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}