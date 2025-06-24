"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
            {/* Animated gradient mesh background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
                style={{
                    backgroundSize: "400% 400%",
                }}
            />

            {/* Animated grid pattern */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    x: [0, 50],
                    y: [0, 50],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </motion.div>

            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 90, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 270, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Additional floating elements */}
            <motion.div
                className="absolute top-1/6 right-1/3 w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-md"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -180, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -90, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Animated light rays */}
            <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
                        style={{
                            left: `${10 + i * 12}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -window.innerHeight || -800],
                            x: [0, 30],
                            scale: [0, 1, 0],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: Math.random() * 15,
                        }}
                    />
                ))}
            </div>

            {/* Pulsing glow effects */}
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Orbiting elements */}
            <motion.div
                className="absolute top-1/3 left-1/2 w-2 h-2 bg-cyan-400/60 rounded-full"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
                style={{
                    transformOrigin: "0 100px",
                }}
            />

            <motion.div
                className="absolute top-2/3 right-1/3 w-3 h-3 bg-pink-400/60 rounded-full"
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
                style={{
                    transformOrigin: "0 80px",
                }}
            />

            {/* Morphing shapes */}
            <motion.div
                className="absolute top-1/5 left-2/3 w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-lg"
                animate={{
                    borderRadius: ["50%", "25%", "50%"],
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/5 right-1/5 w-28 h-28 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-lg"
                animate={{
                    borderRadius: ["25%", "50%", "25%"],
                    rotate: [0, -180, -360],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}
