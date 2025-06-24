// components/chat/MessageList.tsx
"use client";

import { motion } from "framer-motion";
import { Message } from "@/app/chat/page";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <MessageBubble message={message} />
        </motion.div>
      ))}
    </>
  );
}
