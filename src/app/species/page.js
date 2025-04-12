'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSpeciesByName } from '../../services/speciesService';

export default function SpeciesPage() {
    const router = useRouter();
    const [speciesList, setSpeciesList] = useState([]);
    const [kingdom, setKingdom] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const kingdomFromStorage = localStorage.getItem('kingdomItem');
        const speciesFromStorage = localStorage.getItem('specieItem');
      
        if (kingdomFromStorage) setKingdom(kingdomFromStorage);
        if (speciesFromStorage) setSpeciesList(JSON.parse(speciesFromStorage));
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) return;
    
        const delayDebounce = setTimeout(async () => {
            const results = await getSpeciesByName(searchTerm);
            setSpeciesList(results);
            setCurrentPage(1);
        }, 300);
    
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const initialIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSpecies = speciesList.slice(initialIndex, initialIndex + itemsPerPage);
    const totalPages = Math.ceil(speciesList.length / itemsPerPage);

    return (
        <div>
            <h1>Busque espécies {kingdom && `do reino ${kingdom}`}</h1>

            <input
                type="text"
                placeholder="Busque pelo nome comum ou nome científico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {speciesList.length === 0 && searchTerm && (
                <p>Espécies não encontradas.</p>
            )}
            
            {paginatedSpecies.map((species) => {
                const portugueseName = species.vernacularNames?.find(item => item.language === 'por');
                const commonName = portugueseName
                    ? portugueseName.vernacularName
                    : species.vernacularNames?.find(item => item.language === 'eng')?.vernacularName;

                return (
                    <li key={species.key}>
                        <div>
                            <span>{species.scientificName || 'Nome científico desconhecido'}</span>
                            <span> — {commonName ? commonName : 'Nome comum desconhecido'}</span>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.setItem('specieId', species.key);
                                router.push('/species/view');
                            }}
                        >
                            Visualizar
                        </button>
                    </li>
                );
            })}

            {totalPages > 1 && (
                <div>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
