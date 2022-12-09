import React, {useState, useMemo, createContext, useContext} from 'react';
import PropTypes from 'prop-types';

export async function getServerSideProps() {
  const pokeRes = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
  const pokeData = await pokeRes.json();
  return {
    props: {
      pokemon: pokeData,
    },
  };
};

const usePokemonController = (pokemon) => {
  const [filter, setFilter] = useState('');

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      return p.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [pokemon, filter]);

  return {
    filter,
    setFilter,
    pokemon: filteredPokemon,
  };
};

const PokemonContext = createContext(usePokemonController);

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({pokemon, children} ) => {
  const pokemonController = usePokemonController(pokemon);
  return (
    <PokemonContext.Provider value={pokemonController}>
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};
