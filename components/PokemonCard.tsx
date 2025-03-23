// components/PokemonCard.tsx
import React, { useState, useEffect } from 'react';
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
  // State variables
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract the Pokemon ID from the URL
  const pokemonId = pokemon.url.split('/').at(-2);
  console.log('pokemon', pokemon);
  console.log('pokemonId', pokemonId);
  // Implement useEffect to fetch Pokemon details
  useEffect(() => {
    setLoading(true);
    getPokemonDetails(pokemonId || '')
      .then((details) => {
        setPokemonDetails(details);
        setLoading(false);
        console.log('pokemonDetails', pokemonDetails);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // TODO: Implement a function to get color based on Pokemon type
  const getColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };

    return typeColors[type] || '#000';
  };

  const getBackgroundColor = (type: string) => {
    const backgroundColor: Record<string, string> = {
      normal: 'rgb(192, 192, 120)',
      fire: 'rgb(255, 128, 32)',
      water: 'rgb(64, 144, 255)',
      electric: 'rgb(255, 224, 0)',
      grass: 'rgb(96, 224, 64)',
      ice: 'rgb(128, 240, 240)',
      fighting: 'rgb(224, 32, 24)',
      poison: 'rgb(192, 48, 192)',
      ground: 'rgb(240, 192, 64)',
      flying: 'rgb(160, 128, 255)',
      psychic: 'rgb(255, 64, 128)',
      bug: 'rgb(176, 208, 0)',
      rock: 'rgb(200, 176, 32)',
      ghost: 'rgb(112, 72, 192)',
      dragon: 'rgb(96, 32, 255)',
      dark: 'rgb(128, 88, 56)',
      steel: 'rgb(176, 176, 224)',
      fairy: 'rgb(240, 112, 176)',
    };

    return backgroundColor[type] || '#000';
  };

  // TODO: Implement loading state UI

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!pokemonDetails) {
    return <ActivityIndicator />;
  }

  // TODO: Implement error state UI

  if (error) {
    return <Text>{error}</Text>;
  }

  // TODO: Implement the main component UI

  return (
    // Wrap with Link component for navigation
    <Link href={`/pokemon/${pokemonId}`} asChild>
      <TouchableOpacity>
        <View
          style={[
            styles.card,
            {
              backgroundColor: getBackgroundColor(
                pokemonDetails?.types[0].type?.name || ''
              ),
            },
          ]}
        >
          <Image
            source={{ uri: pokemonDetails?.sprites.front_default }}
            style={styles.pokemonImage}
          />
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonId}>
              #{pokemonDetails?.id.toString().padStart(3, '0')}
            </Text>
            <Text style={styles.pokemonName}>{pokemonDetails?.name}</Text>

            <View style={styles.typeContainer}>
              {pokemonDetails?.types.map((type) => (
                <Text
                  key={type.type?.name}
                  style={[
                    styles.typeTags,
                    { backgroundColor: getColor(type.type?.name || '') },
                  ]}
                >
                  {type.type?.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  typeTags: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 6,
    paddingTop: 1,
    paddingBottom: 2,
    borderRadius: 50,
    marginRight: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    padding: 8,
    borderRadius: 8,

    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pokemonId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 50,
    height: 50,
  },
  pokemonInfo: {
    flex: 1,
    marginLeft: 16,
  },
});
