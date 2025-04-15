"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { getSpecieById } from "../../../services/speciesService";
import { isAuthenticated } from "../../../services/authService";

export default function ViewSpecies() {
  const router = useRouter();
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchSpeciesData() {
      setIsLoading(true);
      try {
        const specieId = localStorage.getItem("specieId");
        if (!specieId) {
          throw new Error("ID da espécie não encontrado");
        }

        const data = await getSpecieById(specieId);
        setSpecies(data);
      } catch (err) {
        console.error("Erro ao buscar dados da espécie:", err);
        setError(err.message || "Erro ao carregar dados da espécie");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSpeciesData();
  }, [])

  function getCommonName(species) {
    if (!species || !species.vernacularNames || species.vernacularNames.length === 0) {
      return "Nome comum desconhecido";
    }

    const portugueseName = species.vernacularNames.find((item) => item.language === "por");
    if (portugueseName) {
      return portugueseName.vernacularName;
    }

    const englishName = species.vernacularNames.find((item) => item.language === "eng");
    if (englishName) {
      return englishName.vernacularName;
    }

    return species.vernacularNames[0].vernacularName || "Nome comum desconhecido";
  }

  function getDescription(species) {
    if (!species || !species.descriptions || species.descriptions.length === 0) {
      return "Sem descrição disponível";
    }

    const portugueseDesc = species.descriptions.find((item) => item.language === "por");
    if (portugueseDesc) {
      return portugueseDesc.description;
    }

    const englishDesc = species.descriptions.find((item) => item.language === "eng");
    if (englishDesc) {
      return englishDesc.description;
    }

    return species.descriptions[0].description || "Sem descrição disponível";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-green-700 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para a lista
          </button>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
              <span className="ml-2 text-gray-600">Carregando informações da espécie...</span>
            </div>
          )}

          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
              <p className="mb-4">{error}</p>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors"
              >
                Voltar para a lista
              </button>
            </div>
          )}

          {!isLoading && !error && species && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {species.kingdom && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20">Reino: {species.kingdom}</span>
                  )}
                  {species.phylum && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20">Filo: {species.phylum}</span>
                  )}
                  {species.class && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20">Classe: {species.class}</span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">{species.scientificName}</h1>
                <p className="text-white/90 italic">{getCommonName(species)}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Taxonômicas</h2>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Ordem:</div>
                        <div className="text-sm text-gray-900">{species.order || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Família:</div>
                        <div className="text-sm text-gray-900">{species.family || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Gênero:</div>
                        <div className="text-sm text-gray-900">{species.genus || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Espécie:</div>
                        <div className="text-sm text-gray-900">{species.species || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Autoria:</div>
                        <div className="text-sm text-gray-900">{species.authorship || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Status Taxonômico:</div>
                        <div className="text-sm text-gray-900">{species.taxonomicStatus || "Não disponível"}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Habitat:</div>
                        <div className="text-sm text-gray-900">
                          {species.habitats && species.habitats.length > 0
                            ? species.habitats.join(", ")
                            : "Não disponível"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Status de Ameaça:</div>
                        <div className="text-sm text-gray-900">
                          {species.threatStatuses && species.threatStatuses.length > 0
                            ? species.threatStatuses.join(", ")
                            : "Não disponível"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Extinto:</div>
                        <div className="text-sm text-gray-900">{species.extinct ? "Sim" : "Não"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Publicado em:</div>
                        <div className="text-sm text-gray-900">{species.publishedIn || "Não disponível"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-500">Origem:</div>
                        <div className="text-sm text-gray-900">{species.origin || "Não disponível"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição</h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700">{getDescription(species)}</p>
                  </div>
                </div>

                {species.vernacularNames && species.vernacularNames.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Nomes em Diferentes Idiomas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {species.vernacularNames.map((name, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between"
                        >
                          <span className="text-gray-700">{name.vernacularName}</span>
                          <span className="text-gray-500 text-sm">
                            {name.language === "por" ? "Português" : name.language === "eng" ? "Inglês" : name.language}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
