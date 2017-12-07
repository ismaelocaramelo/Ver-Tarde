import request from './request';
import buildUrl, { types } from './endpoints';


/**
 * Utils function to generate the secure headers given the authorization token
 * @param  {string} token             - Token that authorize the petitions
 * @return {Object}                   - Object that contain the secure headers information
 * @property {?string} Authorization  - Header authorization
 */
export function generateSecureHeader(token) {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Try to login into the application
 * @param username    - Username from the user
 * @param password    - Password from the user
 * @returns {Promise<Object>}
 * @property {string} data.message   - status of response
 * @property {?string} data.token    - jwt token of request
 */
export function postLogin(username, password) {
  const url = buildUrl(types.LOGIN);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ username, password }),
  });
}

export function signUp(username, password) {
  const url = buildUrl(types.CREATE_USER);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ username, password }),
  });
}

export function topMovies() {
  const url = buildUrl(types.MOVIES);
  return request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

export function movieConfig() {
  const url = buildUrl(types.CONFIGURATION);
  return request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

export function searchMovie(name) {
  const url = buildUrl(types.SEARCH_MOVIE);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ name }),
  });
}

export function addFavourites(user, movieDBId) {
  const url = buildUrl(types.ADD_FAVORITES);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ user, movieDBId }),
  });
}

export function getFavourites(user) {
  const url = buildUrl(types.FAVORITES);
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ user }),
  });
}

