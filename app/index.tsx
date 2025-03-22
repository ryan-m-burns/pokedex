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
  const [pokemonData, setPokemonData] = useState<PokemonListResponse | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Consider storing the complete API response (including next URL) rather than just the Pokemon array

  // TODO: Implement the fetchPokemon function
  // Consider how to handle the initial fetch vs. fetching with a provided URL
  const fetchPokemon = async (url = '') => {
    try {
      // If no URL is provided, use the default API endpoint
      const data = await getPokemonList(url);
      setPokemonData(data);
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching Pokemon:', error);
    }
  };

  // TODO: Implement initial data loading with useEffect
  useEffect(() => {
    fetchPokemon();
  }, []);

  // TODO: Implement pull-to-refresh functionality
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPokemon(); // Fetch from the beginning (no URL)
    setRefreshing(false);
  };

  // Use the next URL from your current state to fetch the next page
  const handleLoadMore = async () => {
    if (pokemonData && pokemonData.next) {
      const newData = await getPokemonList(pokemonData.next);
      // Merge existing results with new ones
      setPokemonData({
        ...newData,
        results: [...pokemonData.results, ...newData.results],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>
      <FlatList
        data={pokemonData?.results || []}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListFooterComponentStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
});
