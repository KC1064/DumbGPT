// components/chat/GenreSidebar.tsx
"use client";

import { genres } from "../app/chat/constants/genre";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function GenreSidebar({ selectedGenre, onGenreChange }: {
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
}) {
    return (
        <Sidebar className="border-r border-gray-700 bg-gray-800/80 backdrop-blur-sm flex flex-col justify-between">
            <div>
                <SidebarHeader className="border-b border-gray-700 p-4 bg-black/90">
                    <motion.div className="flex items-center space-x-2 group" whileHover={{ scale: 1.02 }}>
                        <Brain className="h-6 w-6 text-blue-400" />
                        <span className="font-bold text-lg text-white">DumbGPT</span>
                    </motion.div>
                    <p className="text-sm text-gray-400 mt-2 flex gap-2">
                        <Sparkles className="h-4 w-4" />
                        Categories
                    </p>
                </SidebarHeader>

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
                                                onClick={() => onGenreChange(genre.name)}
                                                isActive={selectedGenre === genre.name}
                                                className={`w-full justify-start h-[60px] rounded-lg border transition-all duration-300 ${selectedGenre === genre.name
                                                    ? `${genre.color} border-current shadow-lg`
                                                    : `text-gray-300 border-gray-700 ${genre.hoverColor} hover:border-gray-600`
                                                    }`}
                                            >
                                                <span className="mr-3 text-xl">{genre.icon}</span>
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


                </SidebarContent>
            </div>
        </Sidebar>
    );
}
