export const createCardFilmTemplate = (film) => {
  const {title, raiting, year, duration, genre, poster, description, comments, isWatchlist, isWatched, isFavorite} = film;
  const controlClass = (controlName) => {
    return controlName ? ` film-card__controls-item--active` : ``;
  };
  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments}</a>
      <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${controlClass(isWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${controlClass(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite${controlClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`;
};
