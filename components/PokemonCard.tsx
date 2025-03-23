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
      normal: 'rgba(167 167 121 / 0.5)',
      fire: 'rgba(238 130 48 / 0.50)',
      water: 'rgba(99 144 240 / 0.50)',
      electric: 'rgba(247 208 44 / 0.50)',
      grass: 'rgba(122 199 76 / 0.50)',
      ice: 'rgba(150 217 214 / 0.50)',
      fighting: 'rgba(194 46 40 / 0.50)',
      poison: 'rgba(163 62 161 / 0.50)',
      ground: 'rgba(226 191 101 / 0.50)',
      flying: 'rgba(169 143 243 / 0.50)',
      psychic: 'rgba(249 85 135 / 0.50)',
      bug: 'rgba(166 185 26 / 0.50)',
      rock: 'rgba(182 161 54 / 0.50)',
      ghost: 'rgba(115 87 151 / 0.50)',
      dragon: 'rgba(111 53 252 / 0.50)',
      dark: 'rgba(112 87 70 / 0.50)',
      steel: 'rgba(183 183 206 / 0.50)',
      fairy: 'rgba(214 133 173 / 0.50)',
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
