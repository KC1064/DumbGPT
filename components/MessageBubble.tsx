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
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Custom link rendering
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                className="text-blue-400 underline hover:text-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        ),
                        // Code block / inline code rendering
                        code: (props) => {
                            const { inline, className, children, ...rest } = props as {
                                inline?: boolean;
                                className?: string;
                                children: React.ReactNode;
                            };

                            const childrenString = React.Children.toArray(children).join("");

                            if (!inline) {
                                return (
                                    <code
                                        {...rest}
                                        className={`block text-pink-400 text-sm font-mono ${className || ""}`}
                                    >
                                        {childrenString}
                                    </code>
                                );
                            }

                            return (
                                <code
                                    {...rest}
                                    className={`${className || ""} bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-pink-400`}
                                >
                                    {childrenString}
                                </code>
                            );
                        },

                        pre: ({ children, ...props }) => (
                            <pre
                                className="bg-black text-white rounded-lg overflow-x-auto p-3 my-2 text-sm"
                                {...props}
                            >
                                {children}
                            </pre>
                        ),
                        p: (props) => <p className="mb-0 last:mb-0" {...props} />,
                        ul: (props) => <ul className="list-disc pl-5 my-2" {...props} />,
                        ol: (props) => <ol className="list-decimal pl-5 my-2" {...props} />,
                        li: (props) => <li className="mb-1" {...props} />,
                        h1: (props) => <h1 className="text-xl font-bold my-3" {...props} />,
                        h2: (props) => <h2 className="text-lg font-semibold my-2" {...props} />,
                    }}
                >
                    {message.text}
                </ReactMarkdown>

                <p
                    className={`text-xs mt-2 opacity-70 ${message.isUser ? "text-blue-100" : "text-gray-400"
                        } ${message.isUser ? "" : "text-right"}`}
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
