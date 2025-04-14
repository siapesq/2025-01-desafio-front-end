"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, isAuthenticated } from "../services/authService";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (isAuthenticated()) {
                setIsLoggedIn(true);
            }

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    const firstName = parsedUser.name.split(" ")[0];
                    setUser(firstName);
                } catch (e) {
                    setUser("Usuário");
                }
            }
        }
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        router.push("/login");
    }

    return (
        <header className="bg-white shadow-sm border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <h1 className="text-xl font-bold text-green-800">BioDiversa</h1>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                        <>
                            <span className="text-green-700">Olá, {user}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 transition-colors shadow-sm"
                            >
                                Sair
                            </button>
                        </>
                        ) : (
                        <>
                            <Link
                                href="/about"
                                className="px-4 py-2 text-green-700 hover:text-green-600 font-medium transition-colors"
                                >
                                Sobre
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-green-700 hover:text-green-600 font-medium transition-colors"
                                >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 transition-colors shadow-sm"
                                >
                                Registrar
                            </Link>
                        </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        >
                            <span className="sr-only">Abrir menu</span>
                            <svg
                                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    {isLoggedIn ? (
                        <>
                        <div className="px-4 py-2 text-green-700">Olá, {user}</div>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-green-700 hover:bg-gray-100"
                        >
                            Sair
                        </button>
                        </>
                    ) : (
                        <>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-green-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sobre
                        </Link>
                        <Link
                            href="/login"
                            className="block px-4 py-2 text-green-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block px-4 py-2 text-green-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Registrar
                        </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
