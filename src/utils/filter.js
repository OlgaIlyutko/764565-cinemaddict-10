import {SortType} from '../components/sort';

const FilterType = {
  ALL: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const getWatchlistCount = (films) => {
  return films.filter((it) => it.isWatchlist);
};

export const getHistoryCount = (films) => {
  return films.filter((it) => it.isWatched);
};

export const getFavoritesCount = (films) => {
  return films.filter((it) => it.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistCount(films);
    case FilterType.HISTORY:
      return getHistoryCount(films);
    case FilterType.FAVORITES:
      return getFavoritesCount(films);
  }
  return films;
};

export const sortFilmsBySort = (films, sortType) => {
  const sortedFilms = films.slice();
  switch (sortType) {
    case SortType.DATE:
      return sortedFilms.slice().sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    case SortType.RATING:
      return sortedFilms.sort((a, b) => a.rating - b.rating);
    case SortType.DEFAULT:
      return sortedFilms;
  }
  return sortedFilms;
};
