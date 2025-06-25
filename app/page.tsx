"use client"

import Link from "next/link"
import { ArrowRight, Brain, MessageSquare, Sparkles, Zap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"
import { easeInOut, motion } from "motion/react"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Header */}
      <motion.header
        className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105">
            <div className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">DumbGPT</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="transition-transform duration-200 hover:scale-105">
              <Button variant="ghost" asChild className="text-black bg-white">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            <div className="transition-transform duration-200 hover:scale-105">
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          className="container mx-auto text-center max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div className="mb-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              Complex Things Made{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Simple
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              DumbGPT breaks down complicated topics into easy-to-understand explanations. Whether it&apos;s medical jargon,
              legal documents, or tech concepts - we make it simple.
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
            <div className="transition-transform duration-200 hover:scale-105 hover:-translate-y-1">
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <Link href="/chat">
                  Start Chatting
                  <span className="ml-2">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
            <div className="transition-transform duration-200 hover:scale-105 hover:-translate-y-1">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gray-600 text-gray-800 hover:text-slate-700 hover:border-gray-400"
                asChild
              >
                <a href="#why-choose">Learn More</a>
              </Button>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-700"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center space-x-2 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === 0 ? "bg-red-500" : i === 1 ? "bg-yellow-500" : "bg-green-500"}`}
                />
              ))}
            </div>
            <div className="text-left space-y-4">
              <div className="bg-gray-700 rounded-lg p-4 transition-transform duration-200 hover:scale-105">
                <p className="text-gray-200">
                  <strong>You:</strong> &quot;Explain quantum computing to me&quot;
                </p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 transition-transform duration-200 hover:scale-105">
                <p className="text-gray-200">
                  <strong>DumbGPT:</strong> &quot;Think of quantum computing like a super-smart coin that can be heads AND
                  tails at the same time, until you look at it. Regular computers use coins that are either heads OR
                  tails (1s and 0s), but quantum computers use these magical coins to solve problems way faster! 🪙✨&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm" id="why-choose">
        <div
          className="container mx-auto max-w-6xl"
        >
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose DumbGPT?</h2>
            <p className="text-xl text-gray-300">We specialize in making the complicated, uncomplicated</p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Sparkles,
                title: "Simple Explanations",
                description: "Complex topics broken down into bite-sized, easy-to-understand pieces",
                color: "text-blue-400",
              },
              {
                icon: BookOpen,
                title: "Multiple Categories",
                description: "Specialized knowledge across medical, legal, tech, sports, and more",
                color: "text-purple-400",
              },
              {
                icon: Zap,
                title: "Instant Clarity",
                description: "Get clear answers immediately, no more confusion or overwhelm",
                color: "text-green-400",
              },
            ].map((feature, index) => (
              <motion.div key={index}>
                <Card className="border-gray-700 shadow-lg bg-gray-800/80 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div
                      className="transition-transform duration-200 hover:scale-105 hover:rotate-5"
                    >
                      <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-gray-800/50 backdrop-blur-sm">
        <div
          className="container mx-auto max-w-6xl"
        >
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Explore Different Topics</h2>
            <p className="text-xl text-gray-300">Choose from various categories to get specialized explanations</p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { name: "Medical", icon: "🏥", color: "bg-red-900/30 text-red-300" },
              { name: "Legal", icon: "⚖️", color: "bg-blue-900/30 text-blue-300" },
              { name: "Technology", icon: "💻", color: "bg-purple-900/30 text-purple-300" },
              { name: "Sports", icon: "⚽", color: "bg-green-900/30 text-green-300" },
              { name: "Finance", icon: "💰", color: "bg-yellow-900/30 text-yellow-300" },
              { name: "Science", icon: "🔬", color: "bg-indigo-900/30 text-indigo-300" },
              { name: "History", icon: "📚", color: "bg-orange-900/30 text-orange-300" },
              { name: "General", icon: "🌟", color: "bg-pink-900/30 text-pink-300" },
            ].map((category) => (
              <motion.div key={category.name}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2, ease: easeInOut }}>
                <Card className="cursor-pointer bg-gray-800/80 backdrop-blur-sm border-gray-700 h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl mx-auto mb-3 transition-transform duration-200 hover:scale-105 hover:rotate-12`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-white">{category.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-800 to-purple-800">
        <div
          className="container mx-auto text-center max-w-4xl"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Simplify Your World?</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join thousands of users who&apos;ve made complex topics simple with DumbGPT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="transition-transform duration-200 hover:scale-105 hover:-translate-y-1">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group" asChild>
                <Link href="/chat">
                  Start Chatting
                  <span
                    className="ml-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
            <div className="transition-transform duration-200 hover:scale-105 hover:-translate-y-1">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-blue-500 border-white hover:bg-white hover:text-blue-800"
                asChild
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4">
        <div
          className="container mx-auto max-w-6xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 group transition-transform duration-200 hover:scale-105">
              <div className="transition-transform duration-200 group-hover:rotate-12">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-2xl font-bold">DumbGPT</span>
            </div>
            <div className="flex space-x-6">
              {["About", "Privacy", "Terms", "Contact"].map((link) => (
                <div key={link} className="transition-transform duration-200 hover:scale-105 hover:-translate-y-2">
                  <Link href={`/${link.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DumbGPT. Making complex things simple, one explanation at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}