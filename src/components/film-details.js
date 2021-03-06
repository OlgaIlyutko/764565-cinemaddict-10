import {getFormatedDate, getFormattedDuration} from '../utils/formatting';
import AbstractSmartComponent from './abstract-smart-component';
import {formateDateTime} from '../utils/formatting';

const MAX_RAITING = 9;
const ENTER_KEYCODE = 13;
const CTRL_KEYCODE = 17;

const createFilmDetailsTemplate = (filmInfo, options = {}, addToWachist) => {
  const {poster, ageLimit, title, alternativeTitle, rating, director, writers, actors, releaseDate, duration, country, genres, description, personalRating} = filmInfo;
  const {isWatchlist, isWatched, isFavorite} = options;
  const getGenres = Array.from(genres).map((it) => `<span class="film-details__genre">${it}</span>`).join(``);

  const personalRatingMarkup = new Array(MAX_RAITING).fill(``).map((it, index) => createPersonalRaitingMarkup(personalRating, index)).join(``);

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
              ${personalRatingMarkup}
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

const createPersonalRaitingMarkup = (personalRating, index) => {
  const indexElement = index + 1;
  return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${indexElement}" id="rating-${indexElement}" ${personalRating === indexElement ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${indexElement}">${indexElement}</label>`;
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

  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`#watchlist`)
      .addEventListener(`click`, () => {
        this._isWatchlist = !this._isWatchlist;
        if (this._onWatchlistClick) {
          this._onWatchlistClick();
        }
      });

    element.querySelector(`#watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;
        this._addToWachist = !this._addToWachist;
        if (this._onWatchedClick) {
          this._onWatchedClick();
        }
      });

    element.querySelector(`#favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        if (this._onFavoritesClick) {
          this._onFavoritesClick();
        }
      });

    element.querySelectorAll(`.film-details__user-rating-input`).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        if (this._onPersonalRatingSet) {
          this._onPersonalRatingSet(evt.target.value);
        }
      });
    });

    if (element.querySelector(`.film-details__watched-reset`)) {
      element.querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        if (this._onWatchedClick) {
          this._onWatchedClick();
        }
      });
    }

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        element.remove();
      });
  }

  disableCommentForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = true;
    this.getElement().querySelector(`.film-details__comment-input`).style.backgroundColor = `grey`;
  }

  enableCommentForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = false;
    this.getElement().querySelector(`.film-details__comment-input`).style.backgroundColor = `white`;
  }

  disableRatingBlock() {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((it) => {
      it.disabled = true;
    });
  }

  enableRatingBlock() {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((it) => {
      it.disabled = false;
    });
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonHandler = handler;
  }

  setToWatchlistClickHandler(handler) {
    this._onWatchlistClick = handler;
  }

  setWatchedClickHandler(handler) {
    this._onWatchedClick = handler;
  }

  setToFavoritesClickHandler(handler) {
    this._onFavoritesClick = handler;
  }

  setToSentPersonalRating(handler) {
    this._onPersonalRatingSet = handler;
  }

  setSubmitCommentHandler(handler) {
    const pressed = new Set();

    const getNewCommentEmoji = () => {
      const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label img`);
      if (!emojiElement) {
        return ``;
      }
      const emojiFullName = emojiElement.src.split(`/`);
      const emojiName = emojiFullName[emojiFullName.length - 1];
      const emojiIndex = emojiName.lastIndexOf(`.`);
      return emojiName.slice(0, emojiIndex);
    };

    const getNewCommentText = () => {
      const textElement = this.getElement().querySelector(`.film-details__comment-input`);
      return textElement.value;
    };

    this.getElement().querySelector(`form`).addEventListener(`keydown`, (evt) => {
      pressed.add(evt.keyCode);
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

    this.getElement().querySelector(`form`).addEventListener(`keyup`, (evt) => {
      pressed.delete(evt.keyCode);
    });
  }
}
