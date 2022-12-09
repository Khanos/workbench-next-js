import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import {PokemonProvider} from '../context/store';

function MyApp({Component, pageProps}) {
  return (
    <PokemonProvider pokemon={pageProps.pokemon}>
      <Component {...pageProps} />
    </PokemonProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
