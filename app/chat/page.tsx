'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatSession {
  title: string;
  messages: Message[];
}

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Gemini AI setup
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  // Create new chat session (resets the current chat)
  const createNewChat = () => {
    setCurrentChat({
      title: "New Chat",
      messages: []
    });
    setUserInput(""); // Clear input when starting a new chat
  };

  // Generate response using Gemini AI
  const generateResponse = async () => {
    if (!userInput.trim() || !user) return;

    setIsGenerating(true);

    const userMessage: Message = {
      text: userInput,
      isUser: true,
    };

    // Initialize currentChat if it's null, otherwise update it
    let updatedMessages: Message[];
    let currentChatTitle: string;

    if (!currentChat) {
      currentChatTitle = userInput.substring(0, 50) + (userInput.length > 50 ? '...' : '');
      updatedMessages = [userMessage];
      setCurrentChat({
        title: currentChatTitle,
        messages: updatedMessages,
      });
    } else {
      currentChatTitle = currentChat.title;
      updatedMessages = [...currentChat.messages, userMessage];
      setCurrentChat(prev => prev ? { ...prev, messages: updatedMessages } : null);
    }

    const currentUserInput = userInput;
    setUserInput(""); // Clear the input field immediately

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(currentUserInput);
      const response = await result.response;
      const responseText = response.text();

      const aiMessage: Message = {
        text: responseText || "Sorry, I couldn't generate a response.",
        isUser: false,
      };

      updatedMessages = [...updatedMessages, aiMessage];

      setCurrentChat(prev => prev ? { ...prev, messages: updatedMessages, title: currentChatTitle } : null);

    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage: Message = {
        text: "Error generating response. Please try again.",
        isUser: false,
      };

      updatedMessages = [...updatedMessages, errorMessage];
      setCurrentChat(prev => prev ? { ...prev, messages: updatedMessages } : null);

    } finally {
      setIsGenerating(false);
    }
  };


  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateResponse();
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ←
            </button>
          </div>

          <button
            onClick={createNewChat}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {/* Chat history display is now effectively empty as it's not being loaded from Firestore */}
            <p className="text-gray-500 text-sm italic">No saved chats (history feature removed).</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm text-gray-700 truncate max-w-32">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-3 p-2 hover:bg-gray-100 rounded"
            >
              →
            </button>
          )}
          <h1 className="text-xl font-semibold">
            {currentChat?.title || "Chat with AI"}
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentChat?.messages.length === 0 || !currentChat ? (
            <div className="text-center text-gray-500 mt-20">
              <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            currentChat.messages.map((message, index) => (
              <div
                key={index} // Using index as key since no 'id' from Firestore
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {/* Removed timestamp as it's not relevant without persistence */}
                </div>
              </div>
            ))
          )}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span>AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              disabled={isGenerating}
            />
            <button
              onClick={generateResponse}
              disabled={isGenerating || !userInput.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}