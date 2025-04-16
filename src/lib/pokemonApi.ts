const POKEMON_API = "https://pokeapi.co/api/v2/";




export async function getpokemonList() {


    const response = await fetch( POKEMON_API + "pokemon?limit=151&offset=0");
    const data  = await response.json();

    return data.results;

}


export async function getPokemon(name: string) {
    const response  =  await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();


    if (!response.ok) {
        return null;
      }

      return data;
}