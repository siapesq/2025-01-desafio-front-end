"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getPokemon } from "@/lib/pokemonApi";
import { Progress } from "@/components/ui/progress";
import { SessionProvider } from "next-auth/react";
import UserButton from "@/components/UserButton";

import {
  HeartPulse,
  Swords,
  Shield,
  ShieldCheck,
  Zap,
  MoveRight,
} from "lucide-react";

import { motion } from "framer-motion";
import ColorThief from "colorthief";

export default function PokemonPage() {
  const params = useParams();
  const pokemonName = params?.pokemonName as string;
  const [pokemonObject, setPokemonObject] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>("");

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (pokemonName) {
        const data = await getPokemon(pokemonName);
        setPokemonObject(data);
      }
    };
    fetchPokemon();
  }, [pokemonName]);

  // Detecta a cor dominante da imagem
  useEffect(() => {
    if (imageRef.current && pokemonObject) {
      const img = imageRef.current;
      const colorThief = new ColorThief();

      if (img.complete) {
        const [r, g, b] = colorThief.getColor(img);
        setBgColor(`rgb(${r}, ${g}, ${b})`);
      } else {
        img.onload = () => {
          const [r, g, b] = colorThief.getColor(img);
          setBgColor(`rgb(${r}, ${g}, ${b})`);
        };
      }
    }
  }, [pokemonObject]);

  if (!pokemonObject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Carregando Pokémon...
        </p>
      </div>
    );
  }

  const statIcons: Record<string, JSX.Element> = {
    hp: <HeartPulse className="text-red-500 w-5 h-5" />,
    attack: <Swords className="text-orange-600 w-5 h-5" />,
    defense: <Shield className="text-blue-600 w-5 h-5" />,
    "special-attack": <Zap className="text-purple-600 w-5 h-5" />,
    "special-defense": <ShieldCheck className="text-green-600 w-5 h-5" />,
    speed: <MoveRight className="text-pink-500 w-5 h-5" />,
  };

  return (
    <SessionProvider>
      {/* NAVBAR fora do gradiente */}
      <nav className="bg-white shadow-sm z-10 relative">
        <UserButton />
      </nav>

      {/* Conteúdo com gradiente */}
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}, #ffffff)`,
        }}
      >
        <main className="px-6 py-8 max-w-4xl mx-auto text-gray-800">
          {/* Caixa com imagem do Pokémon */}
          <div
            className="rounded-2xl shadow-lg p-6 mb-10 text-black flex flex-col items-center"
            style={{
              background: `linear-gradient(to bottom, ${bgColor}, #fff)`,
            }}
          >
            <div className="relative w-[200px] h-[200px]">
              <img
                ref={imageRef}
                src={
                  pokemonObject.sprites.other["official-artwork"]
                    .front_default
                }
                alt={pokemonName}
                crossOrigin="anonymous"
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="text-3xl font-bold capitalize mt-4">{pokemonName}</h1>
          </div>

          {/* Stats em caixinhas */}
          <div className="space-y-4">
            {pokemonObject.stats.map((statObject: any, index: number) => {
              const statName = statObject.stat.name;
              const statValue = statObject.base_stat;
              const icon =
                statIcons[statName] || <HeartPulse className="w-5 h-5" />;

              return (
                <motion.div
                  key={statName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-md"
                >
                  <div className="flex justify-between items-center text-sm font-medium mb-2">
                    <div className="flex items-center gap-2 capitalize text-gray-700">
                      {icon}
                      {statName}
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {statValue}
                    </span>
                  </div>

                  {/* Animação da barra de progresso */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${statValue}%` }}
                    transition={{
                      delay: index * 0.1 + 0.3, // Adicionando um pequeno atraso para a animação
                      duration: 1, // Durando 1 segundo
                    }}
                  >
                    <Progress value={statValue} className="h-2" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
