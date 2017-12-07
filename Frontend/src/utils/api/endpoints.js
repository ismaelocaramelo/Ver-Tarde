const apiBaseUrl = 'http://localhost:3001';

export const types = {
  CREATE_USER: 'CREATE_USER',
  LOGIN: 'LOGIN',
  MOVIES: 'MOVIES',
  CONFIGURATION: 'CONFIGURATION',
  FAVORITES: 'FAVORITES',
  ADD_FAVORITES: 'ADD_FAVORITES',
  SEARCH_MOVIE: 'SEARCH_MOVIE',
};

const endpointsBuilders = {
  [types.CREATE_USER]() {
    return '/user';
  },
  [types.LOGIN]() {
    return '/login';
  },
  [types.MOVIES]() {
    return '/movies';
  },
  [types.CONFIGURATION]() {
    return '/movies/configuration';
  },
  [types.SEARCH_MOVIE]() {
    return '/movies/search';
  },
  [types.FAVORITES]() {
    return '/user/movies/favorites';
  },
  [types.ADD_FAVORITES]() {
    return '/user/favorites';
  },
};


function buildApiUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${apiBaseUrl}${adjustedPath}`;
}

export default function buildUrl(type, data) {
  const basicUrl = endpointsBuilders[type](data);
  return buildApiUrl(basicUrl);
}
