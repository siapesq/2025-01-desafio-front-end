'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getSpeciesByKingdom } from '../../services/speciesService';

const kingdoms = ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Bacteria', 'Archaea'];

export default function Dashboard() {
  const router = useRouter();

  async function handleClick(kingdom) {
    console.log("kingdom:", kingdom);
    const species = await getSpeciesByKingdom(kingdom);
    localStorage.setItem('specieItem', JSON.stringify(species));
    localStorage.setItem('kingdomItem', kingdom);

    console.log("localStorageSpecies:", species);
    router.push('/species');
  }

  return (
    <div>
      <h1>Selecione um Reino</h1>
      <div>
        {kingdoms.map((kingdom) => (
          <button
            key={kingdom}
            onClick={() => handleClick(kingdom)}
          >
            {kingdom}
          </button>
        ))}
      </div>
    </div>
  );
}
