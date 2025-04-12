const API_URL = 'https://api.gbif.org/v1/species';

export async function getSpeciesByName(query) {
    try {
        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Erro ao buscar espécies');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Erro na busca de espécies:', error);
        return [];
    }
}

const kingdomTaxonKeys = {
  Animalia: 1,
  Plantae: 6,
  Fungi: 5,
  Protista: 3,
  Bacteria: 2,
  Archaea: 0
};
  
export async function getSpeciesByKingdom(kingdomName) {
  try {
    const taxonKey = kingdomTaxonKeys[kingdomName];

    if (taxonKey === undefined) {
      throw new Error('Reino inválido');
    }

    const res = await fetch(`${API_URL}/search?higherTaxonKey=${taxonKey}&rank=SPECIES&status=ACCEPTED&limit=50`);

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
    
  } catch (error) {
    console.error('Erro ao buscar espécies por reino:', error);
    return [];
  }
}
  

export async function getSpecieById(specieId) {
    try {
        const res = await fetch(`${API_URL}/${specieId}`);
        if (!res.ok) throw new Error('Erro ao buscar detalhes da espécie');
        return await res.json();
    } catch (error) {
        console.error('Erro ao buscar detalhes da espécie:', error);
        return null;
    }
}

