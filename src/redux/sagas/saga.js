import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeLatest,
  select
} from "redux-saga/effects";
import { FETCH_MOVIES, FETCH_MOVIE_DETAIL, headers, BASE_URL } from '../Constant';
import { getMoviesSuccess, getMovieDetailSuccess } from '../actions';

const getMovies = async (query) =>
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query
    }
  });

function* fetchMoviesRequest() {
  try {
    const state = yield select();
    const movies = yield call(() => getMovies(state.Movies.query));
    yield put(getMoviesSuccess(movies.data.data.listMoviesApi));
  } catch (error) {
    alert(error)
  }
}
const getMovieDetail = async (query) =>
  await axios({
    url: BASE_URL,
    method: 'post',
    data: {
      query
    }
  });

function* fetchMovieDetailRequest() {
  try {
    const state = yield select();
   // yield put(getMovieDetailSuccess({}));
    const movieDetail = yield call(()=>getMovieDetail(state.Movies.queryDetail));
    yield put(getMovieDetailSuccess(movieDetail.data.data.moviesDetailApi));
  } catch (error) {
    alert(error)
  }
}

export function* fetchAllMovies() {
  yield takeLatest(FETCH_MOVIES, fetchMoviesRequest);
  yield takeLatest(FETCH_MOVIE_DETAIL, fetchMovieDetailRequest);
}

export default function* movieSaga() {
  yield all(
    [
      fork(fetchAllMovies),
    ]
  );
}