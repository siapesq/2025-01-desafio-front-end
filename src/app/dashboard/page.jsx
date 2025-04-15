"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getSpeciesByKingdom } from "../../services/speciesService";
import { Rabbit, Leaf, Flower2, Droplets, BugIcon as Bacteria, Atom } from "lucide-react";
import { isAuthenticated } from "../../services/authService";

const kingdoms = [
  {
    name: "Animalia",
    icon: Rabbit,
    description: "Reino dos animais, seres multicelulares e heterótrofos.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
  {
    name: "Plantae",
    icon: Leaf,
    description: "Reino das plantas, seres autotróficos fotossintetizantes.",
    color: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
  },
  {
    name: "Fungi",
    icon: Flower2,
    description: "Reino dos fungos, decompositores e simbiontes.",
    color: "from-purple-500 to-indigo-600",
    bgLight: "bg-purple-50",
  },
  {
    name: "Protozoa",
    icon: Droplets,
    description: "Reino dos organismos que podem se locomover por cílios, flagelos ou pseudópodes.",
    color: "from-blue-500 to-cyan-600",
    color: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
  },
  {
    name: "Bacteria",
    icon: Bacteria,
    description: "Reino das bactérias, organismos procariontes unicelulares.",
    color: "from-yellow-500 to-amber-600",
    bgLight: "bg-yellow-50",
  },
  {
    name: "Archaea",
    icon: Atom,
    description: "Reino das arqueias, procariontes extremófilos.",
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50",
  },
]

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  async function handleClick(kingdom) {
    const species = await getSpeciesByKingdom(kingdom);
    localStorage.setItem("specieItem", JSON.stringify(species));
    localStorage.setItem("kingdomItem", kingdom);

    console.log(species);

    router.push("/species");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore os Reinos da Vida</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecione um reino para descobrir as espécies catalogadas em nosso banco de dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kingdoms.map((kingdom) => (
              <div
                key={kingdom.name}
                className={`rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:transform hover:scale-105 ${kingdom.bgLight}`}
              >
                <div className={`bg-gradient-to-r ${kingdom.color} p-6 flex items-center justify-between`}>
                  <h2 className="text-xl font-bold text-white">{kingdom.name}</h2>
                  <kingdom.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{kingdom.description}</p>
                  <button
                    onClick={() => handleClick(kingdom.name)}
                    className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Explorar Espécies
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
