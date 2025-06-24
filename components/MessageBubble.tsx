"use client";

import React from "react";
import { UserCircle, Bot } from "lucide-react";
import { Message } from "@/app/chat/page";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MessageBubble({ message }: { message: Message }) {
    return (
        <div
            className={`flex items-start space-x-3 my-2 ${message.isUser ? "flex-row-reverse space-x-reverse" : ""
                }`}
        >
            {/* Avatar */}
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm">
                {message.isUser ? (
                    <UserCircle className="w-6 h-6 text-blue-200" />
                ) : (
                    <Bot className="w-6 h-6 text-green-400" />
                )}
            </div>

            {/* Message Bubble Content */}
            <div
                className={`rounded-2xl p-3 shadow-lg max-w-[80%] ${message.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 border border-gray-700 text-white"
                    }`}
            >
                {/* ReactMarkdown for rendering the message text */}
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Custom renderer for <a> tags
                        a: ({ node, ...props }) => (
                            <a
                                {...props}
                                className="text-blue-400 underline hover:text-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        ),
                        // Custom renderer for <code> tags (inline and block)
                        code: ({ node, inline, className, children, ...props }) => {
                            const childrenString = React.Children.toArray(children).join("");

                            if (!inline) {
                                // For code blocks, we let the <pre> renderer handle the main styling
                                // This <code> is nested inside <pre> for semantic correctness
                                return (
                                    <code
                                        {...props}
                                        // className from remark-gfm typically contains language-xxxx
                                        // We ensure any such class is preserved for potential syntax highlighting
                                        className={`block text-pink-400 text-sm font-mono ${className || ''}`}
                                    >
                                        {childrenString}
                                    </code>
                                );
                            }

                            return (
                                <code
                                    {...props}
                                    className={`${className || ''} bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-pink-400`}
                                >
                                    {childrenString}
                                </code>
                            );
                        },
                        pre: ({ node, children, ...props }) => (
                            <pre
                                className="bg-black text-white rounded-lg overflow-x-auto p-3 my-2 text-sm" // Added text-sm
                                {...props}
                            >
                                {children}
                            </pre>
                        ),
                        p: ({ node, ...props }) => <p className="mb-0 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-semibold my-2" {...props} />,
                    }}
                >
                    {message.text}
                </ReactMarkdown>

                <p
                    className={`text-xs mt-2 opacity-70 ${message.isUser ? "text-blue-100" : "text-gray-400"
                        } ${
                        // To align timestamp with text for user messages or on its own line for bot
                        message.isUser ? "" : "text-right"
                        }`}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>
    );
}