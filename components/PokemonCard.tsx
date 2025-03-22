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

  // TODO: Implement a function to get color based on Pokemon type

  // TODO: Implement loading state UI

  // TODO: Implement error state UI

  // TODO: Implement the main component UI

  return (
    // Wrap with Link component for navigation
    <Link href={`/pokemon/${pokemonId}`} asChild>
      <TouchableOpacity>{/* Implement your card UI here */}</TouchableOpacity>
    </Link>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
});
