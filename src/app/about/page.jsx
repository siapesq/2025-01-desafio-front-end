"use client";

import React from "react";
import { BookOpen, Leaf, Shield } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-grow">
            <section className="bg-gradient-to-b from-green-600 to-teal-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre o BioDiversa</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Dedicado à preservação e documentação da biodiversidade global através da tecnologia e da ciência.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nossa Missão</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            O BioDiversa nasceu da necessidade de tornar o conhecimento sobre a biodiversidade global mais acessível
                            e compreensível para todos. Nossa missão é criar uma plataforma educativa e informativa que cataloga
                            espécies de todos os reinos biológicos, oferecendo dados precisos e atualizados.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Acreditamos que o conhecimento é o primeiro passo para a conservação. Ao proporcionar acesso fácil a
                            informações sobre as diversas formas de vida em nosso planeta, esperamos inspirar uma maior apreciação
                            pela natureza e promover esforços de conservação.
                        </p>

                        <div className="flex justify-center mt-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <BookOpen className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Educar</h3>
                                    <p className="text-gray-600">
                                        Fornecer informações científicas precisas e acessíveis sobre a biodiversidade global.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Leaf className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Preservar</h3>
                                    <p className="text-gray-600">
                                        Contribuir para esforços de conservação através da conscientização e do conhecimento.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Shield className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Proteger</h3>
                                    <p className="text-gray-600">
                                        Apoiar a proteção de espécies ameaçadas através da divulgação de informações sobre seu status.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
  );
}
