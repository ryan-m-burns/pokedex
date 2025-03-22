import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPokemonDetails, getPokemonSpecies } from '../../utils/api';
import { Pokemon, PokemonSpecies } from '../../types/pokemon';
import StatBar from '../../components/StatBar';
import { StatusBar } from 'expo-status-bar';

export default function PokemonDetailScreen() {
  // TODO: Get the id parameter from useLocalSearchParams

  // TODO: Add state variables for:
  // - pokemon (type Pokemon | null)
  // - species (type PokemonSpecies | null)
  // - loading (type boolean)
  // - error (type string | null)
  // - activeTab (type string)

  // TODO: Implement useEffect to fetch Pokemon data

  // TODO: Implement helper functions:
  // - getTypeColor to get color based on Pokemon type
  // - getEnglishDescription to get the English description from flavor text

  // TODO: Implement loading state UI

  // TODO: Implement error state UI

  return (
    <View style={styles.container}>
      {/* TODO: Implement the detail screen UI with:
        - Header with back button
        - Pokemon image
        - Type tags
        - Tab navigation
        - Content section with About and Stats tabs
      */}
    </View>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
  container: {},
});
