// components/chat/Header.tsx
"use client";

import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { getAuth, signOut, User } from "firebase/auth";
import { LogOut } from "lucide-react";

type GenreData = {
    color: string;
    icon: React.ReactNode;
};

export function Header({ selectedGenre, genreData, user }: {
    selectedGenre: string;
    genreData: GenreData;
    user: User | null;
}) {
    return (
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
                        className={`w-12 h-12 rounded-full ${genreData.color} flex items-center justify-center text-xl border`}
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {genreData.icon}
                    </motion.div>
                    <div>
                        <h1 className="font-semibold text-lg text-white">{selectedGenre} Assistant</h1>
                        <p className="text-sm text-gray-400">Simplifying {selectedGenre.toLowerCase()} topics</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {user && (
                    <motion.div
                        className="flex items-center space-x-2 text-sm text-gray-400"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center gap-3 text-white p-2 rounded-md bg-gray-700/40 border border-gray-600">
                            <div className="w-8 h-8 bg-blue-500 rounded-full text-white font-semibold flex items-center justify-center uppercase">
                                {(user.displayName || user.email || "U")[0]}
                            </div>
                            <div className="text-sm font-medium truncate">{user.displayName || user.email}</div>
                        </div>
                    </motion.div>
                )}
                <Button
                    onClick={() => signOut(getAuth()).then(() => window.location.href = "/login")}
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10"
                >
                    <LogOut className="w-5 h-5" />
                </Button>
            </div>

        </motion.header>
    );
}
