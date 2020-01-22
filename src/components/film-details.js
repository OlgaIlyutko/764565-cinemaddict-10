import {getFormatedDate, getFormattedDuration} from '../utils/formatting';
import AbstractSmartComponent from './abstract-smart-component';
import {formateDateTime} from '../utils/formatting';
import he from 'he';

const ENTER_KEYCODE = 13;
const CTRL_KEYCODE = 17;

const createFilmDetailsTemplate = (filmInfo, options = {}, addToWachist) => {
  const {poster, ageLimit, title, alternativeTitle, rating, director, writers, actors, releaseDate, duration, country, genres, description, personalRating} = filmInfo;
  const {isWatchlist, isWatched, isFavorite} = options;
  const getGenres = Array.from(genres).map((it) => `<span class="film-details__genre">${it}</span>`).join(``);
  const generateRaitingBlock = () => {
    return (
      `<div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src=${poster} alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${personalRating === 1 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-1">1</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${personalRating === 2 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-2">2</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${personalRating === 3 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-3">3</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${personalRating === 4 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-4">4</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${personalRating === 5 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-5">5</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${personalRating === 6 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-6">6</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${personalRating === 7 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-7">7</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${personalRating === 8 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-8">8</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${personalRating === 9 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-9">9</label>

              </div>
            </section>
          </div>
        </section>
        </div>`
    );
  };
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="">

          <p class="film-details__age">${ageLimit}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
          </div>

          <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors.join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${getFormatedDate(releaseDate)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${getFormattedDuration(duration)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
            ${getGenres}
          </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
      </div>
      </div>

      <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
  </div>
  ${addToWachist ? generateRaitingBlock() : ``}
  <div class="form-details__bottom-container">
      
      </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._isWatchlist = film.isWatchlist;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;

    this._deleteCommentClickHandler = null;

    this._addToWachist = this._isWatched;

    this.recoveryListeners();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    }, this._addToWachist);
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonHandler = handler;
  }

  setToWatchlistClickHandler(handler) {
    this._toWatchlistClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this._watchedClickHandler = handler;
  }

  setToFavoritesClickHandler(handler) {
    this._toFavoritesClickHandler = handler;
  }

  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`#watchlist`)
      .addEventListener(`click`, () => {
        this._isWatchlist = !this._isWatchlist;
        if (this._toWatchlistClickHandler) {
          this._toWatchlistClickHandler();
        }
      });

    element.querySelector(`#watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;
        this._addToWachist = !this._addToWachist;
        if (this._watchedClickHandler) {
          this._watchedClickHandler();
        }
      });

    element.querySelector(`#favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        if (this._toFavoritesClickHandler) {
          this._toFavoritesClickHandler();
        }
      });

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        element.remove();
      });
  }

  setSubmitCommentHandler(handler) {
    let pressed = new Set();

    const getNewCommentEmoji = () => {
      const emojiFullName = this.getElement().querySelector(`.film-details__add-emoji-label img`).src.split(`/`);
      const emojiName = emojiFullName[emojiFullName.length - 1];
      const emojiIndex = emojiName.lastIndexOf(`.`);
      return emojiName.slice(0, emojiIndex);
    };

    const getNewCommentText = () => {
      const text = this.getElement().querySelector(`.film-details__comment-input`);
      return text.value;
    };

    this.getElement().querySelector(`form`).addEventListener(`keydown`, function (event) {
      pressed.add(event.keyCode);
      const codes = [ENTER_KEYCODE, CTRL_KEYCODE];
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();

      handler({
        img: getNewCommentEmoji(),
        commentText: getNewCommentText(),
        commentDay: formateDateTime(new Date())
      });
    });

    this.getElement().querySelector(`form`).addEventListener(`keyup`, function (event) {
      pressed.delete(event.keyCode);
    });
  }
}
