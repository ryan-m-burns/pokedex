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

  const convertHeight = (height: number) => {
    return height / 10;
  };

  const convertWeight = (weight: number) => {
    return weight / 10;
  };

  const convertName = (name: string) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'about' && styles.activeTabButtonText,
                ]}
              >
                About
              </Text>
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
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'stats' && styles.activeTabButtonText,
                ]}
              >
                Stats
              </Text>
            </TouchableOpacity>
          </View>
          {/* About Tab */}
          {activeTab === 'about' && (
            <View>
              <Text style={styles.flavorText}>
                {getEnglishFlavorText(species?.flavor_text_entries || [])}
              </Text>
              {/* Height */}
              <View style={styles.statContainer}>
                <Text style={styles.statTextHeader}>Height</Text>
                <Text style={styles.statText}>
                  {convertHeight(pokemon?.height || 0)} m
                </Text>
              </View>
              {/* Weight */}
              <View style={styles.statContainer}>
                <Text style={styles.statTextHeader}>Weight</Text>
                <Text style={styles.statText}>
                  {convertWeight(pokemon?.weight || 0)} kg
                </Text>
              </View>
              {/* Abilities */}
              <View style={styles.statContainer}>
                <Text style={styles.statTextHeader}>Abilities</Text>
                <View style={styles.abilitiesContainer}>
                  {pokemon?.abilities?.map((ability) => (
                    <Text key={ability.ability.name} style={styles.abilityText}>
                      {convertName(ability.ability.name)}
                    </Text>
                  ))}
                </View>
              </View>
              {/* Types */}
              <Text style={styles.typeTextHeader}>Types</Text>
              <View style={styles.typeContainer}>
                {pokemon?.types?.map((type) => (
                  <Text
                    key={type.type.name}
                    style={[
                      styles.typeTag,
                      { backgroundColor: getTypeColor(type.type.name) },
                    ]}
                  >
                    {type.type.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <View style={styles.statsContainer}>
              {pokemon?.stats?.map((stat) => (
                <View key={stat.stat.name} style={styles.statItem}>
                  <Text style={styles.statTextHeader}>
                    {convertName(stat.stat.name)}
                  </Text>
                  <View style={styles.emptyStatBar}>
                    <View
                      style={[
                        styles.statBar,
                        {
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor: getTypeColor(
                            pokemon?.types[0].type?.name || ''
                          ),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statText}>{stat.base_stat}</Text>
                </View>
              ))}
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
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#000',
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  flavorText: {
    fontSize: 12,
    color: 'black',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeTextHeader: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  typeTag: {
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 50,
    marginRight: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statTextHeader: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 6,
    width: 100,
  },
  statText: {
    fontSize: 12,
    color: 'black',
  },
  abilitiesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0,
    gap: 4,
  },
  abilityText: {
    fontSize: 12,
    color: 'black',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  statBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
  emptyStatBar: {
    width: '60%',
    backgroundColor: 'lightgrey',
    height: 10,
    borderRadius: 5,
  },
});
