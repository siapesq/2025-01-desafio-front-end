'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getPokemon } from "@/lib/pokemonApi";
import ColorThief from "colorthief";

interface CaracterCardProps {
  name: string;
}

const CaracterCard = ({ name }: CaracterCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hp, setHp] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState<string>("rgb(255, 255, 255)");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonObject = await getPokemon(name);
      const image = pokemonObject.sprites.other["official-artwork"].front_default;
      const stats = pokemonObject.stats.find(
        (stat: any) => stat.stat.name === "hp"
      );
      setImageUrl(image);
      setHp(stats?.base_stat ?? null);
    };

    fetchPokemon();
  }, [name]);


  const handleImageLoad = () => {
    if (imgRef.current && imageUrl) {
      const colorThief = new ColorThief();
      try {
        const color = colorThief.getColor(imgRef.current);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (error) {
        console.error("Erro ao extrair cor da imagem:", error);
      }
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Link href={`/${name}`}>
      <div
        className="w-[260px] h-[360px] rounded-xl border-[5px] p-2 shadow-[0_4px_8px_rgba(0,0,0,0.2)] flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: bgColor, borderColor: bgColor }}
      >

        <div className="flex justify-between items-center px-2 mt-1">
          <div className="bg-white/70 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
            {capitalize(name)}
          </div>
          {hp && (
            <span>
              <span className="text-[10px] font-bold text-black-600">HP </span>
              <span className="text-sm font-bold text-black-600">{hp}</span>
            </span>
          )}
        </div>


        <div className="flex justify-center items-center mt-1">
          <div className="w-40 h-40 rounded-full border-4 border-white bg-white/50 relative overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                ref={imgRef}
                crossOrigin="anonymous"
                onLoad={handleImageLoad}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">Carregando...</span>
            )}
          </div>
        </div>


        <div className="bg-white/80 h-6 mx-6 mt-1 rounded-md shadow-inner text-black text-center text-xs font-semibold flex items-center justify-center">
          Veja Mais
        </div>


        <div className="h-6 mt-1 mb-2" />


        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-white opacity-0 hover:opacity-30 hover:animate-[moveBeam_1.5s_ease-in-out_infinite]" />
      </div>
    </Link>
  );
};

export default CaracterCard;
