import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const genres = [
  // ... genre objects ...
];

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

export default function useChat() {
  const [selectedGenre, setSelectedGenre] = useState("General");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm DumbGPT 🤖 Welcome to the General category! I'm here to break down complex topics into simple, easy-to-understand explanations. What would you like me to simplify for you today?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
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
      const aiMessage = {
        id: userMessage.id + 1,
        text: text || "Sorry, I couldn't generate a response.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const aiMessage = {
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
    const genreMessage = {
      id: messages.length + 1,
      text: `Perfect! You've switched to the ${genre} category 🎯 I'm now specialized in explaining ${genre.toLowerCase()} topics. Ask me anything!`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, genreMessage]);
  };

  const selectedGenreData = genres.find((g) => g.name === selectedGenre) || genres[7];

  return {
    selectedGenre,
    setSelectedGenre,
    messages,
    isTyping,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    handleGenreChange,
    genres,
    selectedGenreData,
  };
} 