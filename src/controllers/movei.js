import CardFilmComponent from '../components/card-film';
import FilmDetailsComponent from '../components/film-details';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPAP: `popap`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._cardFilmComponent = null;
    this._filmDetailsComponent = null;

    this._mode = Mode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldCardFilmComponent = this._cardFilmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._cardFilmComponent = new CardFilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._cardFilmComponent.setImgClickHandler(() => this._filmPopapOpen());
    this._cardFilmComponent.setTitleClickHandler(() => this._filmPopapOpen());
    this._cardFilmComponent.setCommentsClickHandler(() => this._filmPopapOpen());

    this._filmDetailsComponent.setCloseButtonClickHandler(() => this._filmPopapClose());

    this._cardFilmComponent.setToWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._cardFilmComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));

    });

    this._cardFilmComponent.setToFavoritesClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (oldFilmDetailsComponent && oldCardFilmComponent) {
      replace(this._cardFilmComponent, oldCardFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    }
  }

  _filmPopapOpen() {
    this._onViewChange();
    const siteFooterElement = document.querySelector(`footer`);
    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.POPAP;
  }

  _filmPopapClose() {
    this._filmDetailsComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._filmPopapClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmPopapClose();
    }
  }

}
