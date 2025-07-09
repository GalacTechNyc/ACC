// Music Catalog Data Structure for Alliance Collective Compositions
// This will be populated with real uploaded music

export const drumlineCadences = [];

export const fullBandScores = [];

export const mediaAndFilm = [];

export const warmups = [];

export const beats = [];

// Function to get music from localStorage (uploaded via admin)
export const getUploadedMusic = () => {
  const savedItems = localStorage.getItem('accMusicItems')
  return savedItems ? JSON.parse(savedItems) : []
}

// Combined catalog for search and filtering - now uses uploaded music
export const allMusic = getUploadedMusic();

// Category mappings - will be populated dynamically from uploaded music
export const categories = {
  'Drumline': [],
  'Full Band': [],
  'Media/Gaming': [],
  'Media/Film': [],
  'Warmups': [],
  'Beats': []
};

// Difficulty levels
export const difficultyLevels = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Professional',
  'All Levels'
];

// Price ranges
export const priceRanges = [
  { label: 'Under $50', min: 0, max: 49 },
  { label: '$50 - $99', min: 50, max: 99 },
  { label: '$100 - $199', min: 100, max: 199 },
  { label: '$200+', min: 200, max: 9999 }
];

export default {
  drumlineCadences,
  fullBandScores,
  mediaAndFilm,
  warmups,
  beats,
  allMusic,
  categories,
  difficultyLevels,
  priceRanges,
  getUploadedMusic
};

