import FilmDetailsComponent from '../components/film-details';
import CardFilmComponent from '../components/card-film';
import ListFilmsStandardComponent from '../components/list-films-standard';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ButtonShowMoreComponent from '../components/button-show-more';
import NoFilmsComponent from '../components/no-films';
import FilmsBlockComponent from '../components/films-block';
import FilterComponent from '../components/filter';
import SortComponent, {SortType} from '../components/sort';
import {generateFilms} from '../mock/card-film';
import {render, remove, RenderPosition} from '../utils/render.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (containerElement, film) => {
  const cardFilmComponent = new CardFilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const siteFooterElement = document.querySelector(`footer`);
  const filmPopapOpen = () => {
    render(siteFooterElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    filmDetailsComponent.setCloseButtonClickHandler(() => filmPopapClose());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmPopapClose = () => {
    remove(filmDetailsComponent);
  };

  cardFilmComponent.setImgClickHandler(() => filmPopapOpen());
  cardFilmComponent.setTitleClickHandler(() => filmPopapOpen());
  cardFilmComponent.setCommentsClickHandler(() => filmPopapOpen());

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmPopapClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(containerElement, cardFilmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (containerElement, films) => {
  films.forEach((film) => renderFilm(containerElement, film));
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsBlockComponent = new FilmsBlockComponent();
    this._listFilmsStandardComponent = new ListFilmsStandardComponent();
    this._listFilmsExtraTopRatedComponent = new ListFilmsExtraComponent(`Top rated`);
    this._listFilmsExtraMostCommentedComponent = new ListFilmsExtraComponent(`Most commented`);
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
  }

  render(films) {
    const renderButtonShowMoreComponent = (listFilmsStandardContainerElement) => {
      if (showingFilmsCount >= films.length) {
        return;
      }
      render(listFilmsStandardElement, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

      this._buttonShowMoreComponent.setButtonClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilms(listFilmsStandardContainerElement, films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._buttonShowMoreComponent);
        }
      });
    };

    const container = this._container;

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    const filmsBlock = this._filmsBlockComponent.getElement();
    render(filmsBlock, this._listFilmsStandardComponent, RenderPosition.BEFOREEND);
    const listFilmsStandardElement = filmsBlock.querySelector(`.films-list`);

    if (films.length === 0) {
      while (listFilmsStandardElement.firstChild) {
        listFilmsStandardElement.removeChild(listFilmsStandardElement.firstChild);
      }
      render(listFilmsStandardElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(filmsBlock, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(filmsBlock, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(listFilmsStandardContainerElement, films.slice(0, showingFilmsCount));

    renderButtonShowMoreComponent(listFilmsStandardContainerElement);

    const listFilmsExtraElements = filmsBlock.querySelectorAll(`.films-list--extra`);
    listFilmsExtraElements.forEach((it) => {
      const listFilmsExtraContainerElements = it.querySelector(`.films-list__container`);
      const filmsExtra = generateFilms(2);
      renderFilms(listFilmsExtraContainerElements, filmsExtra);
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DATE:
          sortedFilms = films.slice(0, showingFilmsCount).sort((a, b) => a.releaseDate - b.releaseDate);
          break;
        case SortType.RAITING:
          sortedFilms = films.slice(0, showingFilmsCount).sort((a, b) => a.raiting - b.raiting);
          break;
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmsCount);
          break;
      }
      listFilmsStandardContainerElement.innerHTML = ``;
      renderFilms(listFilmsStandardContainerElement, sortedFilms.slice(0, showingFilmsCount));
    });
  }
}
