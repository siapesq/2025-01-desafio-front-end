"use client";
import CaracterCard from "@/components/CaracterCard";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Importar o motion

interface CardLayoutProps {
  pokemonList: any;
}

export function CardLayout({ pokemonList }: CardLayoutProps) {
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const searchFilter = (list: any[]) => {
    return list.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);

  const visibleIndexes = () => {
    const len = filteredPokemonList.length;
    if (len === 0) return [];

    return [
      (currentIndex - 1 + len) % len,
      currentIndex % len,
      (currentIndex + 1) % len
    ];
  };

  useEffect(() => {
    if (filteredPokemonList.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered && !isTransitioning) {
        handleNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredPokemonList.length, isHovered, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning || filteredPokemonList.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % filteredPokemonList.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning || filteredPokemonList.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredPokemonList.length) % filteredPokemonList.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <main className="w-full h-full overflow-hidden">
      <div className="max-w-full mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-poppins font-extrabold text-[#305e9f] py-6 text-center">
          Procure pelo seu Pokémon!
        </h3>

        <div className="flex justify-center items-center gap-2 w-full mb-8">
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Charizard, Pikachu ..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-[24rem] md:w-[32rem] pl-10 pr-5 py-2 sm:py-3 bg-white rounded-full shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
          />
        </div>

        <div
          className="relative w-full flex justify-center mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {filteredPokemonList.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all cursor-pointer"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div className="relative w-full h-[28rem] mx-auto overflow-visible flex justify-center items-center">
            <div className="relative w-full h-full">
              {visibleIndexes().map((index, position) => {
                const pokemon = filteredPokemonList[index];
                const baseStyle =
                  "absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out";
                if (filteredPokemonList.length === 1 && position !== 1) return null;

                let scaleClass = "scale-95 opacity-80";
                if (position === 1) {
                  scaleClass = "scale-110 opacity-100"; // Centralização com maior escala
                }

                return (
                  <motion.div
                    key={`${pokemon.name}-${position}`}
                    className={`${baseStyle} left-${position === 0 ? "1/4" : position === 2 ? "3/4" : "1/2"} -translate-x-1/2 ${scaleClass}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: position * 0.2,
                    }}
                  >
                    <CaracterCard name={pokemon.name} />
                  </motion.div>
                );
              })}
            </div>
          </div>
          {filteredPokemonList.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-10 md:right-20 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all cursor-pointer"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default CardLayout;
