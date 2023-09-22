import { useEffect, useState } from 'react';

function ApiPokemon() {
  
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      

      const pokemonDataPromises = data.results.map(async (pokemon) => {
        
        const response = await fetch(pokemon.url);
        const data = await response.json();
       
        return data;
      });


      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemon(pokemonData);
    }
    
    fetchPokemons();
    }, []);

    

  return (
   
    <div>
   
      <ul className="principal">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <h2 className="namePokemon">{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <ul className="stadistics">
              {pokemon.stats.map((stadistics) => (
                <li key={stadistics.stat.name}>
                  {stadistics.stat.name}: {stadistics.base_stat}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
;


export default ApiPokemon;



