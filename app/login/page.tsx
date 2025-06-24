'use client'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedBackground } from "@/components/animated-background"


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCred.user);
      router.push("/chat"); // Redirect to home page after successful login
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";

      // Handle specific Firebase error codes
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />

      <Card className="w-full max-w-md hover-lift animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardHeader className="text-center">
          <div >
            <Link href={"/"} className="flex items-center justify-center space-x-2 mb-4 group">
              <Brain className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="text-2xl font-bold text-white transition-colors duration-300">DumbGPT</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-white transition-colors duration-300">Welcome Back</CardTitle>
          <CardDescription className="text-gray-300 transition-colors duration-300">
            Sign in to continue simplifying complex topics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <Button className="w-full hover-lift group glow-effect" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>

            <div className="text-center text-sm text-gray-400 transition-colors duration-300">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:underline transition-colors duration-300">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


