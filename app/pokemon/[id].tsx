import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPokemonDetails, getPokemonSpecies } from '../../utils/api';
import { Pokemon, PokemonSpecies, FlavorTextEntry } from '../../types/pokemon';
import { StatusBar } from 'expo-status-bar';
import { getTypeColor, getBackgroundColor } from '../../utils/helpers';

export default function PokemonDetailScreen() {
  const router = useRouter();

  const id = useLocalSearchParams().id.toString();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    getPokemonDetails(id)
      .then((pokemon) => {
        setPokemon(pokemon);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    getPokemonSpecies(id)
      .then((species) => {
        setSpecies(species);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getEnglishFlavorText = (flavorTexts: FlavorTextEntry[]) => {
    const englishEntries = flavorTexts.filter(
      (entry) => entry.language.name === 'en'
    );

    if (englishEntries.length === 0) return 'No description available.';

    const randomIndex = Math.floor(Math.random() * englishEntries.length);

    return englishEntries[randomIndex].flavor_text
      .replace(/\f/g, ' ') // Replace form feeds with spaces
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\r/g, ' ') // Replace carraige returns with spaces
      .replace(/\t/g, ' ') // Replace tabs with spaces
      .replace(/\s+/g, ' ') // Remove extra whitespace
      .trim(); // Remove leading/trailing whitespace
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  {
    /* TODO: Implement the detail screen UI with:
        - Header with back button
        - Pokemon image
        - Type tags
        - Tab navigation
        - Content section with About and Stats tabs
      */
  }

  return (
    <View style={styles.fullScreen}>
      <View
        style={[
          styles.topBackground,
          {
            backgroundColor: getBackgroundColor(
              pokemon?.types[0].type?.name || ''
            ),
          },
        ]}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 20 }}>
            <Text>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Text>
          </TouchableOpacity>
          <Text style={styles.name}>{pokemon?.name}</Text>
          <View style={{ width: 20 }} />
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.pokemonId}>
            #{pokemon?.id.toString().padStart(3, '0')}
          </Text>
          <Image
            source={{
              uri: pokemon?.sprites?.other?.['official-artwork']?.front_default,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('about')}
              style={[
                styles.tabButton,
                activeTab === 'about' && {
                  borderBottomWidth: 2,
                  borderBottomColor: getBackgroundColor(
                    pokemon?.types[0].type?.name || ''
                  ),
                },
              ]}
            >
              <Text>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('stats')}
              style={[
                styles.tabButton,
                activeTab === 'stats' && {
                  borderBottomWidth: 2,
                  borderBottomColor: getBackgroundColor(
                    pokemon?.types[0].type?.name || ''
                  ),
                },
              ]}
            >
              <Text>Stats</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'about' && (
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutText}>
                {getEnglishFlavorText(species?.flavor_text_entries || [])}
              </Text>
              <Text>Types</Text>
              <View style={styles.typeContainer}>
                {pokemon?.types?.map((type) => (
                  <View
                    key={type.type.name}
                    style={[
                      styles.typeTag,
                      { backgroundColor: getBackgroundColor(type.type.name) },
                    ]}
                  >
                    <Text style={styles.typeText}>{type.type.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  headerBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  tabContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',

    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  tabButton: {
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeTag: {
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
  typeText: {
    color: '#fff',
    fontSize: 12,
  },
});
