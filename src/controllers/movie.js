import CardFilmComponent from '../components/card-film';
import FilmDetailsComponent from '../components/film-details';
import Film from '../models/movie';
import Comment from '../models/comments';
import CommentsComponent from '../components/comments';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._cardFilmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsComponent = null;

    this._api = api;
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

    this._cardFilmComponent.setImgClickHandler(() => this._filmPopupOpen());
    this._cardFilmComponent.setTitleClickHandler(() => this._filmPopupOpen());
    this._cardFilmComponent.setCommentsClickHandler(() => this._filmPopupOpen());

    this._filmDetailsComponent.setCloseButtonClickHandler(() => this._filmPopupClose());

    this._cardFilmComponent.setToWatchlistClickHandler(this._onWatchlistClick.bind(this, film));
    this._filmDetailsComponent.setToWatchlistClickHandler(this._onWatchlistClick.bind(this, film));

    this._cardFilmComponent.setWatchedClickHandler(this._onWatchedClick.bind(this, film));
    this._filmDetailsComponent.setWatchedClickHandler(this._onWatchedClick.bind(this, film));

    this._cardFilmComponent.setToFavoritesClickHandler(this._onFavoritesClick.bind(this, film));
    this._filmDetailsComponent.setToFavoritesClickHandler(this._onFavoritesClick.bind(this, film));

    this._filmDetailsComponent.setToSentPersonalRating(this._onPersonalRatingSet.bind(this, film));

    if (oldFilmDetailsComponent && oldCardFilmComponent) {
      replace(this._cardFilmComponent, oldCardFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

    } else {
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    }

    this._api.getComments(film.id)
      .then((comments) => {
        this._commentsComponent = new CommentsComponent(comments);
        const commentsContainerElement = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

        this._commentsComponent.setCommentDeleteHandler(this._commentDeleteHandler.bind(this, film));
        this._commentsComponent.setEmojiCommentHandler(this._emojiCommentSetHandler.bind(this));
        this._filmDetailsComponent.setSubmitCommentHandler(this._commentAddHandler.bind(this, film));

        render(commentsContainerElement, this._commentsComponent, RenderPosition.AFTERBEGIN);
      });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmPopupClose();
    }
  }

  _emojiCommentSetHandler(evt) {
    const emojiCurrentElement = evt.target.cloneNode(false);
    const containerElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    if (!containerElement.childNodes.length) {
      containerElement.insertAdjacentElement(`afterbegin`, emojiCurrentElement);
    } else {
      containerElement.replaceChild(emojiCurrentElement, containerElement.firstChild);
    }
  }

  _onWatchlistClick(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isWatchlist = !film.isWatchlist;
    this._onDataChange(this, film, updateFilm);
  }

  _onWatchedClick(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isWatched = !film.isWatched;
    updateFilm.watchedDate = new Date();
    if (!updateFilm.isWatched) {
      updateFilm.personalRating = 0;
    }
    this._onDataChange(this, film, updateFilm);
  }

  _onFavoritesClick(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isFavorite = !film.isFavorite;
    this._onDataChange(this, film, updateFilm);
  }

  _onPersonalRatingSet(film, newPersonalRating) {
    const idNewPersonalRating = `label[for=rating-` + newPersonalRating + `]`;
    this._filmDetailsComponent.disableRatingBlock();
    const updateFilm = Film.clone(film);
    updateFilm.personalRating = parseInt(newPersonalRating, 10);

    this._api.updateFilm(film.id, updateFilm)
      .then(() => {
        this._onDataChange(this, film, updateFilm);
        this._filmDetailsComponent.enableCommentForm();
      })
      .catch(() => {
        this._filmDetailsComponent.enableCommentForm();
        this._filmDetailsComponent.getElement().classList.add(`shake`);
        this._filmDetailsComponent.getElement().querySelector(idNewPersonalRating).style.backgroundColor = `red`;
      });
  }


  _commentAddHandler(film, addComment) {
    this._filmDetailsComponent.getElement().querySelector(`.film-details__comment-input`).style.border = `none`;
    this._filmDetailsComponent.disableCommentForm();

    const newComment = new Comment({});
    Object.assign(newComment, addComment);
    this._api.createComment(film.id, newComment)
      .then(() => {
        this._onDataChange(this, film, film);
        this._filmDetailsComponent.enableCommentForm();
      })
      .catch(() => {
        this._filmDetailsComponent.enableCommentForm();
        this._filmDetailsComponent.getElement().classList.add(`shake`);
        this._filmDetailsComponent.getElement().querySelector(`.film-details__comment-input`).style.border = `3px solid red`;
      });
  }

  _commentDeleteHandler(film, evt) {
    evt.target.textContent = `Deleting...`;
    evt.target.disabled = true;
    this._api.deleteComment(evt.target.dataset.id)
      .then(() => this._onDataChange(this, film, film))
      .catch(() => {
        evt.target.textContent = `Delete`;
        evt.target.disabled = false;
      });
  }

  _filmPopupOpen() {
    this._onViewChange();
    const siteFooterElement = document.querySelector(`footer`);
    this._mode = Mode.POPUP;
    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _filmPopupClose() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
}
