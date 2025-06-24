// app/chat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../context/AuthContext";

import { genres } from "./constants/genre";
import { getGenrePrompt } from "./constants/prompts";
import { GenreSidebar } from "../../components/Sidebar";
import { Header } from "../../components/ChatHeader";
import { MessageList } from "../../components/MessageList";
import { MessageInput } from "../../components/MessageInput";

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [selectedGenre, setSelectedGenre] = useState("General");
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: `Hi! I'm DumbGPT 🤖 Welcome to the General category! I'm here to break down complex topics into simple, easy-to-understand explanations. What would you like me to simplify for you today?`,
    isUser: false,
    timestamp: new Date(),
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const prompt = `${getGenrePrompt(selectedGenre)}\n\nUser: ${inputMessage}`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: userMessage.id + 1,
        text: text || "Sorry, I couldn't generate a response.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini error:", err);
      const aiMessage: Message = {
        id: userMessage.id + 1,
        text: "Oops! Something went wrong while generating the response.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
      setInputMessage("");
    }
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    const genreMessage: Message = {
      id: messages.length + 1,
      text: `Perfect! You've switched to the ${genre} category 🎯 I'm now specialized in explaining ${genre.toLowerCase()} topics. Ask me anything!`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, genreMessage]);
  };

  const selectedGenreData = genres.find((g) => g.name === selectedGenre) || genres[7];

  return (
    <div className="h-screen bg-gray-900 flex">
      <SidebarProvider className="h-full">
        <GenreSidebar
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        <SidebarInset className="flex-1 flex flex-col">
          <Header
            selectedGenre={selectedGenre}
            genreData={selectedGenreData}
            user={user}
          />

          <ScrollArea className="flex-1 p-6 bg-gray-900/50">
            <div className="space-y-6 max-w-4xl mx-auto">
              <AnimatePresence>
                <MessageList messages={messages} />
              </AnimatePresence>
              {isTyping && (
                <motion.div className="text-sm text-gray-400">AI is typing...</motion.div>
              )}
            </div>
          </ScrollArea>

          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            selectedGenre={selectedGenre}
          />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
