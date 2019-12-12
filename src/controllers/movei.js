import CardFilmComponent from '../components/card-film';
import FilmDetailsComponent from '../components/film-details';
import {render, remove, RenderPosition} from '../utils/render.js';

export default class MovieController {
    constructor(container, onDataChange) {
      this._container = container;
      this._cardFilmComponent = null;
      this._filmDetailsComponent = null;
      this._onDataChange = onDataChange;
      this._onEscKeyDown = this._onEscKeyDown.bind(this);
    }
  
    render(film) {
      this._cardFilmComponent = new CardFilmComponent(film);
      this._filmDetailsComponent = new FilmDetailsComponent(film);
      
      this._cardFilmComponent.setImgClickHandler(() => this._filmPopapOpen());
      this._cardFilmComponent.setTitleClickHandler(() => this._filmPopapOpen());
      this._cardFilmComponent.setCommentsClickHandler(() => this._filmPopapOpen());
    
      this._filmDetailsComponent.setCloseButtonClickHandler(() => this._filmPopapClose());
    
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);

      this._cardFilmComponent.setToWatchlistClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isWatchlist: !isWatchlist,
        }));
      })      
      this._filmDetailsComponent.setToWatchlistClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isWatchlist: !isWatchlist,
        }));
      })

      this._cardFilmComponent.setWatchedClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isWatched: !isWatched,
        }));
        
      })      
      this._filmDetailsComponent.setWatchedClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isWatched: !isWatched,
        }));
      })

      this._cardFilmComponent.setToFavoritesClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isFavorite: !isFavorite,
        }));
      })
      this._filmDetailsComponent.setToFavoritesClickHandler(() => {
        this._onDataChange(this, film, Object.assign({}, film, {
          isFavorite: !isFavorite,
        }));
      })
    }

    _filmPopapOpen() {
      const siteFooterElement = document.querySelector(`footer`);
      render(siteFooterElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }

    _filmPopapClose() {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.removeElement();

    };

    _onEscKeyDown(evt) {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
  
      if (isEscKey) {
        this._filmPopapClose();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    }

}
  