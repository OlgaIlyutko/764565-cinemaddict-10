import ListFilmsStandardComponent from '../components/list-films-standard';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ButtonShowMoreComponent from '../components/button-show-more';
import NoFilmsComponent from '../components/no-films';
import FilmsBlockComponent from '../components/films-block';
import FilterComponent from '../components/filter';
import SortComponent, {SortType} from '../components/sort';
import {generateFilms} from '../mock/card-film';
import {render, remove, RenderPosition} from '../utils/render.js';
import MovieController from './movei';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (containerElement, films) => {
  return films.map((film) => {
    const filmController = new MovieController(containerElement);
    filmController.render(film);

    return MovieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._showedFilmsControllers = [];

    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsBlockComponent = new FilmsBlockComponent();
    this._listFilmsStandardComponent = new ListFilmsStandardComponent();
    this._listFilmsExtraTopRatedComponent = new ListFilmsExtraComponent(`Top rated`);
    this._listFilmsExtraMostCommentedComponent = new ListFilmsExtraComponent(`Most commented`);
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    //const container = this._container.getElement();
    const container = this._container;

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    const filmsBlock = this._filmsBlockComponent.getElement();
    render(filmsBlock, this._listFilmsStandardComponent, RenderPosition.BEFOREEND);
    const listFilmsStandardElement = this._listFilmsStandardComponent.getElement();

    const isNoFilms = (this._films.length === 0) ? true : false;
    if (isNoFilms) {
      while (listFilmsStandardElement.firstChild) {
        listFilmsStandardElement.removeChild(listFilmsStandardElement.firstChild);
      }
      render(listFilmsStandardElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    
    render(filmsBlock, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(filmsBlock, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
    const newFilms = renderFilms(listFilmsStandardContainerElement, this._films.slice(0, showingFilmsCounthis._showingFilmsCount));
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderButtonShowMoreComponent(listFilmsStandardContainerElement);

    const listFilmsExtraElements = filmsBlock.querySelectorAll(`.films-list--extra`);
    listFilmsExtraElements.forEach((it) => {
      const listFilmsExtraContainerElements = it.querySelector(`.films-list__container`);
      const filmsExtra = generateFilms(2);
      renderFilms(listFilmsExtraContainerElements, filmsExtra);
    });
  }

  _renderButtonShowMoreComponent(containerElement) {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }
    render(this._listFilmsStandardComponent.getElement(), this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setButtonClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      renderFilms(containerElement, films.slice(prevFilmsCount, this._showingFilmsCount));

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._buttonShowMoreComponent);
      }
    });
  }

  _onSortTypeChange(SortType) {
    let sortedFilms = [];
    switch (sortType) {
      case SortType.DATE:
        sortedFilms = films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
        break;
      case SortType.RAITING:
        sortedFilms = films.slice().sort((a, b) => a.raiting - b.raiting);
        break;
      case SortType.DEFAULT:
        sortedFilms = films.slice();
        break;
    }
    listFilmsStandardContainerElement.innerHTML = ``;
    renderFilms(listFilmsStandardContainerElement, sortedFilms.slice(0, this._showingFilmsCount));
    
  }

}
