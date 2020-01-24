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
