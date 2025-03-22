// components/PokemonCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { Pokemon } from '../types/pokemon';
import { getPokemonDetails } from '../utils/api';

type PokemonCardProps = {
  pokemon: {
    name: string;
    url: string;
  };
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  // TODO: Add state variables for:
  // - pokemonDetails (type Pokemon | null)
  // - loading (type boolean)
  // - error (type string | null)

  // TODO: Extract the Pokemon ID from the URL

  // TODO: Implement useEffect to fetch Pokemon details
  // useEffect(() => {
  //   getPokemonDetails(pokemonId || '')
  //     .then((details) => {
  //       setPokemonDetails(details);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);
  // TODO: Implement a function to get color based on Pokemon type
  // const getColor = (type: string) => {
  //   switch (type) {
  //     case 'normal':
  //       return '#A8A77A';
  //     case 'fire':
  //       return '#EE8130';
  //     case 'water':
  //       return '#6390F0';
  //     case 'electric':
  //       return '#F7D02C';
  //     case 'grass':
  //       return '#7AC74C';
  //     case 'ice':
  //       return '#96D9D6';
  //     case 'fighting':
  //       return '#C22E28';
  //     case 'poison':
  //       return '#A33EA1';
  //     case 'ground':
  //       return '#E2BF65';
  //     case 'flying':
  //       return '#A98FF3';
  //     case 'psychic':
  //       return '#F95587';
  //     case 'bug':
  //       return '#A6B91A';
  //     case 'rock':
  //       return '#B6A136';
  //     case 'ghost':
  //       return '#735797';
  //     case 'dragon':
  //       return '#6F35FC';
  //     case 'dark':
  //       return '#705746';
  //     case 'steel':
  //       return '#B7B7CE';
  //     case 'fairy':
  //       return '#D685AD';
  //     default:
  //       return '#000';
  //   }
  // };

  // TODO: Implement loading state UI

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  // TODO: Implement error state UI

  // if (error) {
  //   return <Text>{error}</Text>;
  // }

  // TODO: Implement the main component UI

  return (
    // Wrap with Link component for navigation
    <Link href={`/pokemon/${pokemon.url}`} asChild>
      <TouchableOpacity>
        {/* Implement your card UI here */}
        <Text>{pokemon.name}</Text>
      </TouchableOpacity>
    </Link>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
});
