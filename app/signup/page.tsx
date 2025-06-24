'use client'
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedBackground } from "@/components/animated-background"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!firstName.trim() || !lastName.trim()) {
            setError("Please enter your first and last name.");
            setLoading(false);
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email address.");
            setLoading(false);
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password should be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user);

            // Update the user profile with first and last name
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            });

            router.push("/chat"); // Redirect to chat page after successful signup
        } catch (error: any) {
            let errorMessage = "Signup failed. Please try again.";

            // Handle specific Firebase error codes
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "An account with this email already exists.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                case "auth/operation-not-allowed":
                    errorMessage = "Email/password accounts are not enabled.";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password should be at least 6 characters.";
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
                    <div className="flex items-center justify-center space-x-2 mb-4 group">
                        <Link href={"/"} className="flex items-center justify-center space-x-2 mb-4 group">
                            <Brain className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                            <span className="text-2xl font-bold text-white transition-colors duration-300">DumbGPT</span>

                        </Link>
                    </div>
                    <CardTitle className="text-2xl text-white transition-colors duration-300">Create Account</CardTitle>
                    <CardDescription className="text-gray-300 transition-colors duration-300">
                        Join thousands making complex things simple
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-200">
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-200">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
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
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-200">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="transition-all duration-300 focus:scale-[1.02] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full hover-lift group glow-effect"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Button>
                    </form>
                    <div className="text-center text-sm text-gray-400 transition-colors duration-300">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 hover:underline transition-colors duration-300">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}