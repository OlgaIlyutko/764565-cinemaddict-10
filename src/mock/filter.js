const getWatchlistCount = (films) => {
  const watchlistCountFilms = films.filter((it) => it.isWatchlist);
  return watchlistCountFilms.length;
};

const getHistoryCount = (films) => {
  const historyCountFilms = films.filter((it) => it.isWatched);
  return historyCountFilms.length;
};

const getFavoritesCount = (films) => {
  const favoritesCountFilms = films.filter((it) => it.isFavorite);
  return favoritesCountFilms.length;
};

const generateFilters = (films) => {
  const result = [
    {
      name: `watchlist`,
      count: getWatchlistCount(films)
    },
    {
      name: `history`,
      count: getHistoryCount(films)
    },
    {
      name: `favorites`,
      count: getFavoritesCount(films)
    }
  ];
  return result;
};

export {generateFilters};
