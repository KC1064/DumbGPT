"use client";

import { useState } from "react";
import { Send, Brain, Sparkles, User, UserCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const genres = [
  {
    name: "Medical",
    icon: "🏥",
    description: "Health, medicine, and medical terms",
    color: "bg-red-900/30 text-red-300 border-red-800/50",
    hoverColor: "hover:bg-red-800/40",
  },
  {
    name: "Legal",
    icon: "⚖️",
    description: "Law, contracts, and legal concepts",
    color: "bg-blue-900/30 text-blue-300 border-blue-800/50",
    hoverColor: "hover:bg-blue-800/40",
  },
  {
    name: "Technology",
    icon: "💻",
    description: "Tech, programming, and digital concepts",
    color: "bg-purple-900/30 text-purple-300 border-purple-800/50",
    hoverColor: "hover:bg-purple-800/40",
  },
  {
    name: "Sports",
    icon: "⚽",
    description: "Sports rules, strategies, and terminology",
    color: "bg-green-900/30 text-green-300 border-green-800/50",
    hoverColor: "hover:bg-green-800/40",
  },
  {
    name: "Finance",
    icon: "💰",
    description: "Money, investing, and financial terms",
    color: "bg-yellow-900/30 text-yellow-300 border-yellow-800/50",
    hoverColor: "hover:bg-yellow-800/40",
  },
  {
    name: "Science",
    icon: "🔬",
    description: "Physics, chemistry, and scientific concepts",
    color: "bg-indigo-900/30 text-indigo-300 border-indigo-800/50",
    hoverColor: "hover:bg-indigo-800/40",
  },
  {
    name: "History",
    icon: "📚",
    description: "Historical events and contexts",
    color: "bg-orange-900/30 text-orange-300 border-orange-800/50",
    hoverColor: "hover:bg-orange-800/40",
  },
  {
    name: "General",
    icon: "🌟",
    description: "Everyday topics and general knowledge",
    color: "bg-pink-900/30 text-pink-300 border-pink-800/50",
    hoverColor: "hover:bg-pink-800/40",
  },
];

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [selectedGenre, setSelectedGenre] = useState("General");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I'm DumbGPT 🤖 Welcome to the ${selectedGenre} category! I'm here to break down complex topics into simple, easy-to-understand explanations. What would you like me to simplify for you today?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    const authUser = getAuth().currentUser;

    if (authUser) {
      const fullName = authUser.displayName || authUser.email || "User";
      const initials = fullName
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      setUser({ name: fullName, avatar: initials });
    }
  }, []);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getGenrePrompt = (genre: string) => {
    const prompts: Record<string, string> = {
      Medical: `You're a friendly medical tutor. Explain medical concepts to beginners using simple language and analogies.`,
      Legal: `You're a legal explainer. Simplify legal concepts, terms, and contracts for someone with no legal background.`,
      Technology: `You're a tech mentor. Explain programming or technical concepts using relatable analogies and plain English.`,
      Sports: `You're a sports coach. Break down rules or strategies for beginners unfamiliar with the sport.`,
      Finance: `You're a finance guide. Explain money, investing, or economics like you're helping a teenager understand it.`,
      Science: `You're a science communicator. Use simple, visual explanations to make scientific ideas accessible.`,
      History: `You're a history teacher. Describe historical events in a storytelling format that's easy to follow.`,
      General: `You're a general knowledge tutor. Break down any complex topic into clear, easy-to-understand terms.`,
    };

    return prompts[genre] || prompts["General"];
  };

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
        <Sidebar className="border-r border-gray-700 bg-gray-800/80 backdrop-blur-sm flex flex-col justify-between">
          {/* -- TOP: DumbGPT Branding -- */}
          <div>
            <SidebarHeader className="border-b border-gray-700 p-4 bg-black/90">
              <motion.div className="flex items-center space-x-2 group" whileHover={{ scale: 1.02 }}>
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Brain className="h-6 w-6 text-blue-400" />
                </motion.div>
                <span className="font-bold text-lg text-white">DumbGPT</span>
              </motion.div>
              <p className="text-sm text-gray-400 mt-2 flex gap-2">
                <Sparkles className="h-4 w-4" />
                Categories
              </p>
            </SidebarHeader>

            {/* -- MIDDLE: Genre Categories -- */}
            <SidebarContent className="p-4 bg-black/90 h-screen">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {genres.map((genre, index) => (
                      <SidebarMenuItem key={genre.name}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <SidebarMenuButton
                            onClick={() => handleGenreChange(genre.name)}
                            isActive={selectedGenre === genre.name}
                            className={`w-full justify-start h-[60px] rounded-lg border transition-all duration-300 ${selectedGenre === genre.name
                              ? `${genre.color} border-current shadow-lg`
                              : `text-gray-300 border-gray-700 ${genre.hoverColor} hover:border-gray-600`
                              }`}
                          >
                            <motion.span
                              className="mr-3 text-xl"
                              animate={{
                                scale: selectedGenre === genre.name ? [1, 1.2, 1] : 1,
                                rotate: selectedGenre === genre.name ? [0, 10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              {genre.icon}
                            </motion.span>
                            <div className="flex flex-col items-start text-left">
                              <span className="font-medium text-sm">{genre.name}</span>
                              <span className="text-xs opacity-70 line-clamp-2">{genre.description}</span>
                            </div>
                          </SidebarMenuButton>
                        </motion.div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <Button onClick={() => {
                signOut(getAuth()).then(() => window.location.href = "/login");
              }} variant="destructive">Logout</Button>
            </SidebarContent>
          </div>
        </Sidebar>


        <SidebarInset className="flex-1 flex flex-col">
          <motion.header
            className="border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm p-4 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="hover:scale-110 transition-transform duration-300 text-gray-300 hover:text-white" />
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`w-12 h-12 rounded-full ${selectedGenreData.color} flex items-center justify-center text-xl border`}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedGenreData.icon}
                </motion.div>
                <div>
                  <h1 className="font-semibold text-lg text-white">{selectedGenre} Assistant</h1>
                  <p className="text-sm text-gray-400">Simplifying {selectedGenre.toLowerCase()} topics</p>
                </div>
              </div>
            </div>
            <motion.div
              className="flex items-center space-x-2 text-sm text-gray-400"
              whileHover={{scale:1.05}}
              transition={{duration:0.2}}
            >

              {user && (
                <div className="flex items-center gap-3 text-white p-2 rounded-md bg-gray-700/40 border border-gray-600">
                  <div className="w-8 h-8 bg-blue-500 rounded-full text-white font-semibold flex items-center justify-center uppercase">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="text-sm font-medium truncate">{user.name}</div>
                </div>
              )}
            </motion.div>
          </motion.header>

          <ScrollArea className="flex-1 p-6 bg-gray-900/50">
            <div className="space-y-6 max-w-4xl mx-auto">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <div className="w-10 h-10 flex items-center justify-center text-sm">
                        {message.isUser ? (
                          <UserCircle className="w-6 h-6 text-blue-200" />
                        ) : (
                          <Bot className="w-6 h-6 text-green-400" />
                        )}
                      </div>

                      <div className={`rounded-2xl p-4 shadow-lg ${message.isUser ? "bg-blue-600 text-white" : "bg-gray-800 border border-gray-700 text-white"}`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-2 opacity-70 ${message.isUser ? "text-blue-100" : "text-gray-400"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div className="text-sm text-gray-800">AI is typing...</motion.div>
              )}
            </div>
          </ScrollArea>

          <motion.div
            className="border-t border-gray-700 bg-gray-800/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-4 items-end">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask me to simplify something about ${selectedGenre.toLowerCase()}...`}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  disabled={isTyping}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="rounded-xl px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send • Shift + Enter for new line</p>
            </div>
          </motion.div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
