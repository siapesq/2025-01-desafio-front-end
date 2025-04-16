"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Footer from "../../components/footer";
import { getSpeciesByName } from "../../services/speciesService";
import { isAuthenticated } from "../../services/authService";
import Navbar from "../../components/navbar";

export default function SpeciesList() {
  const router = useRouter();
  const [speciesList, setSpeciesList] = useState([]);
  const [kingdom, setKingdom] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true)
    const kingdomFromStorage = localStorage.getItem("kingdomItem");
    const speciesFromStorage = localStorage.getItem("specieItem");

    if (kingdomFromStorage) setKingdom(kingdomFromStorage);
    if (speciesFromStorage) {
      try {
        const parsedSpecies = JSON.parse(speciesFromStorage);
        setSpeciesList(parsedSpecies);
      } catch (e) {
        console.error("Erro ao analisar dados de espécies:", e);
        setSpeciesList([]);
      }
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        if (searchTerm.trim()) {
          const results = await getSpeciesByName(searchTerm);

          if (kingdom) {
            const filteredResults = results.filter(
              (species) => (species.kingdom || "").toLowerCase() === kingdom.toLowerCase(),
            )
            setSpeciesList(filteredResults);
          } else {
            setSpeciesList(results);
          }
        } else {
          const speciesFromStorage = localStorage.getItem("specieItem");
          if (speciesFromStorage) {
            try {
              const parsedSpecies = JSON.parse(speciesFromStorage);
              setSpeciesList(parsedSpecies);
            } catch (e) {
              console.error("Erro ao analisar dados de espécies:", e);
              setSpeciesList([]);
            }
          }
        }
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao buscar espécies:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300)

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, kingdom]);

  const initialIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSpecies = speciesList.slice(initialIndex, initialIndex + itemsPerPage);
  const totalPages = Math.ceil(speciesList.length / itemsPerPage);

  function getKingdomColor(kingdomName) {
    const colors = {
      Animalia: "bg-amber-100 text-amber-800 border-amber-200",
      Plantae: "bg-green-100 text-green-800 border-green-200",
      Fungi: "bg-purple-100 text-purple-800 border-purple-200",
      Protista: "bg-blue-100 text-blue-800 border-blue-200",
      Bacteria: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Archaea: "bg-red-100 text-red-800 border-red-200",
    }

    return colors[kingdomName] || "bg-gray-100 text-gray-800 border-gray-200";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="mb-6 flex items-center text-green-700 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {kingdom ? `Espécies do Reino ${kingdom}` : "Catálogo de Espécies"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore nossa base de dados de espécies catalogadas.
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent bg-white">
              <div className="pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Busque pelo nome científico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 outline-none text-gray-700"
              />
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
              <span className="ml-2 text-gray-600">Carregando espécies...</span>
            </div>
          )}

          {!isLoading && speciesList.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Nenhuma espécie encontrada para sua busca."
                  : "Selecione um reino ou faça uma busca para ver espécies."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                  }}
                  className="px-4 py-2 text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  Limpar busca
                </button>
              )}
            </div>
          )}

          {!isLoading && speciesList.length > 0 && (
            <ul className="space-y-4">
              {paginatedSpecies.map((species) => {
                const portugueseName = species.vernacularNames?.find((item) => item.language === "por")
                const commonName = portugueseName
                  ? portugueseName.vernacularName
                  : species.vernacularNames?.find((item) => item.language === "eng")?.vernacularName

                const kingdomName = species.kingdom || kingdom
                const kingdomColorClass = getKingdomColor(kingdomName)

                return (
                  <li
                    key={species.key}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {kingdomName && (
                              <span className={`text-xs px-2 py-1 rounded-full ${kingdomColorClass}`}>
                                {kingdomName}
                              </span>
                            )}
                            {species.family && <span className="text-xs text-gray-500">Família: {species.family}</span>}
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {species.scientificName || "Nome científico desconhecido"}
                          </h2>
                          {commonName && <p className="text-gray-600">Nome comum: {commonName}</p>}
                          {species.taxonomicStatus && (
                            <p className="text-sm text-gray-500 mt-1">Status taxonômico: {species.taxonomicStatus}</p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            localStorage.setItem("specieId", species.key)
                            router.push("/species/view")
                          }}
                          className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap"
                        >
                          Visualizar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      currentPage === num
                        ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

