import AbstractComponent from '../components/abstract-component';
import {getFormattedDuration} from '../utils/formatting';

const createCardFilmTemplate = (film) => {
  const {poster, title, raiting, releaseDate, duration, genres, description, isWatchlist, isWatched, isFavorite, comments} = film;
  const controlClass = (controlName) => {
    return controlName ? ` film-card__controls-item--active` : ``;
  };
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
      <span class="film-card__year">${releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${getFormattedDuration(duration)}</span>
      <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${controlClass(isWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${controlClass(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite${controlClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class CardFilm extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  setImgClickHandler(handler) {
    this.getElement().querySelector(`img`)
      .addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setToFavoritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }
}
