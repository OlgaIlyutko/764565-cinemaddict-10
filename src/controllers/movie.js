import CardFilmComponent from '../components/card-film';
import FilmDetailsComponent from '../components/film-details';
import Film from '../models/movie';
import Comment from '../models/comments';
import CommentsComponent from '../components/comments';
import {render, replace, RenderPosition} from '../utils/render.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

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

    this._isRenderComments = false;
  }

  _emojiCommentHandler(element) {
    const container = this._filmDetailsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    if (!container.childNodes.length) {
      container.insertAdjacentElement(`afterbegin`, element);
    } else {
      container.replaceChild(element, container.firstChild);
    }
  }

  _toWatchlistClickHandler(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isWatchlist = !film.isWatchlist;
    this._onDataChange(this, film, updateFilm);
  }

  _watchedClickHandler(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isWatched = !film.isWatched;
    if (!updateFilm.isWatched) {
      updateFilm.personalRating = 0;
    }
    this._onDataChange(this, film, updateFilm);
  }

  _toFavoritesClickHandler(film) {
    const updateFilm = Film.clone(film);
    updateFilm.isFavorite = !film.isFavorite;
    this._onDataChange(this, film, updateFilm);
  }

  _toSentPersonalRating(film, newPersonalRating) {
    const updateFilm = Film.clone(film);
    updateFilm.personalRating = parseInt(newPersonalRating, 10);
    this._onDataChange(this, film, updateFilm);
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
    this._api.deleteComment(evt.target.dataset.id)
      .then(() => this._onDataChange(this, film, film))
      .catch((err) => {
        console.error(err);
      });
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

    this._cardFilmComponent.setToWatchlistClickHandler(this._toWatchlistClickHandler.bind(this, film));
    this._filmDetailsComponent.setToWatchlistClickHandler(this._toWatchlistClickHandler.bind(this, film));

    this._cardFilmComponent.setWatchedClickHandler(this._watchedClickHandler.bind(this, film));
    this._filmDetailsComponent.setWatchedClickHandler(this._watchedClickHandler.bind(this, film));

    this._cardFilmComponent.setToFavoritesClickHandler(this._toFavoritesClickHandler.bind(this, film));
    this._filmDetailsComponent.setToFavoritesClickHandler(this._toFavoritesClickHandler.bind(this, film));

    this._filmDetailsComponent.setToSentPersonalRating(this._toSentPersonalRating.bind(this, film));

    if (oldFilmDetailsComponent && oldCardFilmComponent) {
      replace(this._cardFilmComponent, oldCardFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

    } else {
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    }

    this._api.getComments(film.id)
      .then((comments) => {
        this._commentsComponent = new CommentsComponent(comments);
        const commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

        this._commentsComponent.setCommentDeleteHandler(this._commentDeleteHandler.bind(this, film));
        this._commentsComponent.setEmojiCommentHandler(this._emojiCommentHandler.bind(this));
        this._filmDetailsComponent.setSubmitCommentHandler(this._commentAddHandler.bind(this, film));

        render(commentsContainer, this._commentsComponent, RenderPosition.AFTERBEGIN);
        this._isRenderComments = true;
      });
    /*if (this._mode === Mode.POPUP) {
      this._renderComments();
    }*/
  }
/*
  _renderComments() {
    if (this._isRenderComments) {
      return;
    }
    const openedFilm = this._filmDetailsComponent._film;
    this._api.getComments(openedFilm.id)
      .then((comments) => {
        this._commentsComponent = new CommentsComponent(comments);
        const commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

        this._commentsComponent.setCommentDeleteHandler(this._commentDeleteHandler.bind(this, openedFilm));
        this._commentsComponent.setEmojiCommentHandler(this._emojiCommentHandler.bind(this));
        this._filmDetailsComponent.setSubmitCommentHandler(this._commentAddHandler.bind(this, openedFilm));

        render(commentsContainer, this._commentsComponent, RenderPosition.AFTERBEGIN);
        this._isRenderComments = true;
      });
  }*/

  _filmPopupOpen() {
    this._onViewChange();
    const siteFooterElement = document.querySelector(`footer`);
    this._mode = Mode.POPUP;
    render(siteFooterElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    //this._renderComments();
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

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmPopupClose();
    }
  }

}
