const getTypeColor = (type: string) => {
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

export { getTypeColor, getBackgroundColor };
