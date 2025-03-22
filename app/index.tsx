import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getPokemonList } from '../utils/api';
import PokemonCard from '../components/PokemonCard';
import { PokemonListResponse } from '../types/pokemon';

export default function HomePage() {
  // TODO: Add state for the Pokemon data and refreshing
  // Consider storing the complete API response (including next URL) rather than just the Pokemon array

  // TODO: Implement the fetchPokemon function
  // Consider how to handle the initial fetch vs. fetching with a provided URL

  // TODO: Implement initial data loading with useEffect

  // TODO: Implement pull-to-refresh functionality

  // TODO: Implement loading more data when the user scrolls to the bottom
  // Use the next URL from your current state to fetch the next page

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>

      {/* 
        TODO: Implement FlatList with:
        - Data from your Pokemon state
        - PokemonCard as the render item
        - Appropriate key extractor
        - onEndReached for infinite scrolling
        - Pull-to-refresh functionality 
        - Loading indicators
      */}
    </SafeAreaView>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
  container: {},
  header: {},
  title: {},
});
