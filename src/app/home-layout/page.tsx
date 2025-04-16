"use client";

import { useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { getpokemonList } from "@/lib/pokemonApi";
import CardLayout from "@/components/CardLayout";
import { Loader } from "lucide-react";
import UserButton from "@/components/UserButton";

const HomeLayoutContent = () => {
  const { data: session, status } = useSession();
  const [pokemonList, setPokemonList] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const data = await getpokemonList();
        setPokemonList(data);
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [status]);

  if (status === "loading" || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
        <nav>
            <UserButton/>
        </nav>
        <main className="flex-1 bg-gradient-to-b from-[#FFF7B2] to-[#3A86FF] min-h-screen w-full">
        {session && pokemonList && <CardLayout pokemonList={pokemonList} />}
        </main>
    </>
  );
};

// Aqui usamos o SessionProvider localmente só pra essa página
const HomeLayoutPage = () => {
  return (
    <SessionProvider>
      <HomeLayoutContent />
    </SessionProvider>
  );
};

export default HomeLayoutPage;
