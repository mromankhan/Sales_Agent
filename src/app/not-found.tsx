"use client";
import Link from 'next/link';
import { MessageCircle, AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-purple-900/30 animate-ping"></div>
                <div className="absolute w-24 h-24 rounded-full bg-indigo-900/40"></div>
                <AlertTriangle size={48} className="text-pink-500 relative z-10" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Page Not Found
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-4"></div>
          <p className="mt-4 text-xl text-gray-300 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link href="/" passHref>
            <button
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
              <Home size={20} />
              <span className="ml-2">Back to Home</span>
            </button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-600 transition-all duration-300 border border-gray-600"
          >
            <ArrowLeft size={20} />
            <span className="ml-2">Go Back</span>
          </button>
        </div>
        
        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600/50 mb-8">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <MessageCircle size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Need assistance?</h3>
          </div>
          <p className="text-gray-300">
            If you&apos;re having trouble finding what you need, our chatbot is here to help you navigate.
          </p>
        </div>
      </div>
    </div>
  );
}