import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIE_DETAIL,
  FETCH_MOVIE_DETAIL_SUCCESS,
  UPDATE_QUERY,
  UPDATE_QUERY_DETAIL,
  RESET_LIST
} from '../Constant';

export const fetchMovies = () => {
  return {
    type: FETCH_MOVIES
  };
};

export const getMoviesSuccess = (payload) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload
  };
};
export const resetList = () => {
  return {
    type: RESET_LIST,
  };
};
export const updateQuery = (query) => {
  return {
    type: UPDATE_QUERY,
    query
  };
};
export const updateQueryDetail = (query) => {
  return {
    type: UPDATE_QUERY_DETAIL,
    query
  };
};
export const fetchMovieDetail = () => {
  return {
    type: FETCH_MOVIE_DETAIL
  };
};

export const getMovieDetailSuccess = (payload) => {
  return {
    type: FETCH_MOVIE_DETAIL_SUCCESS,
    payload
  };
};