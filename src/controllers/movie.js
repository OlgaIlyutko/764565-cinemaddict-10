import CardFilmComponent from '../components/card-film';
import FilmDetailsComponent from '../components/film-details';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
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

  _toWachlistClickHandler(film) {
    this._onDataChange(this, film, Object.assign({}, film, {
      isWatchlist: !film.isWatchlist,
    }));
  }

  render(film) {
    const oldCardFilmComponent = this._cardFilmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._cardFilmComponent = new CardFilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._cardFilmComponent.setImgClickHandler(() => this._filmPopupOpen());
    this._cardFilmComponent.setTitleClickHandler(() => this._filmPopupOpen());
    this._cardFilmComponent.setCommentsClickHandler(() => this._filmPopupOpen());

    this._filmDetailsComponent.setCloseButtonClickHandler(() => this._filmPopupClose());

    this._cardFilmComponent.setToWatchlistClickHandler(this._toWachlistClickHandler.bind(this, film));
    this._filmDetailsComponent.setToWachlistClickHandler(this._toWachlistClickHandler.bind(this, film));

    if (oldFilmDetailsComponent && oldCardFilmComponent) {
      replace(this._cardFilmComponent, oldCardFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    }
  }

  _filmPopupOpen() {
    this._onViewChange();
    const siteFooterElement = document.querySelector(`footer`);
    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.POPAP;
  }

  _filmPopupClose() {
    this._filmDetailsComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._filmPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmPopupClose();
    }
  }

}
