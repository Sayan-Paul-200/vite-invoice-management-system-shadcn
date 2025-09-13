import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

// ComingSoon - single-file React + TypeScript component for a Vite app using shadcn UI
// - No rounded borders (user preference)
// - Simple full-screen banner with 2 buttons that redirect to /login and /register

const ComingSoon: React.FC = () => {

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl mx-6">
                <Card className="p-12">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                            Invoice Management System
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
                            We're putting the final touches on our dashboard. Sign in to access your account or get started
                            to create a new one.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-4">

                            <Button asChild>
                                <Link
                                    to='/login'
                                    className="px-8 py-3"
                                    aria-label="Sign in to Invoice Management System"
                                >
                                    Sign In
                                </Link>
                            </Button>

                            <Button asChild variant={"outline"}>
                                <Link
                                    to='/register'
                                    className="px-8 py-3"
                                    aria-label="Register for Invoice Management System"
                                >
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <ModeToggle />

                        </div>

                        <div className="mt-10 text-sm text-muted-foreground">
                            <span className="inline-block mr-2">🚀</span>
                            We’ll be live soon — thanks for your patience!
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
};

export default ComingSoon;
