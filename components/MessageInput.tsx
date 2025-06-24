// components/chat/MessageInput.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export function MessageInput({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isTyping,
  selectedGenre,
}: {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  selectedGenre: string;
}) {
  return (
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
            className="bg-gray-700 h-12 border-gray-600 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
  );
}
