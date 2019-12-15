import ListFilmsStandardComponent from '../components/list-films-standard';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ButtonShowMoreComponent from '../components/button-show-more';
import NoFilmsComponent from '../components/no-films';
import FilmsBlockComponent from '../components/films-block';
import FilterComponent from '../components/filter';
import SortComponent, {SortType} from '../components/sort';
import {generateFilms} from '../mock/card-film';
import {render, remove, RenderPosition} from '../utils/render.js';
import MovieController from './movie';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (containerElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new MovieController(containerElement, onDataChange, onViewChange);
    filmController.render(film);

    return filmController;
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

    this._listFilmsStandardContainerElement = this._listFilmsStandardComponent.getElement().querySelector(`.films-list__container`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    const container = this._container;

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    const filmsBlock = this._filmsBlockComponent.getElement();
    render(filmsBlock, this._listFilmsStandardComponent, RenderPosition.BEFOREEND);
    const listFilmsStandardElement = this._listFilmsStandardComponent.getElement();

    const isNoFilms = this._films.length === 0;
    if (isNoFilms) {
      while (listFilmsStandardElement.firstChild) {
        listFilmsStandardElement.removeChild(listFilmsStandardElement.firstChild);
      }
      render(listFilmsStandardElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(filmsBlock, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(filmsBlock, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    this._listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);

    const newFilms = renderFilms(this._listFilmsStandardContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    //this._showedFilmsControllers = renderFilms(this._listFilmsStandardContainerElement, )

    this._renderButtonShowMoreComponent(this._listFilmsStandardContainerElement);

    const listFilmsExtraElements = filmsBlock.querySelectorAll(`.films-list--extra`);
    listFilmsExtraElements.forEach((it) => {
      const listFilmsExtraContainerElements = it.querySelector(`.films-list__container`);
      const filmsExtra = generateFilms(2);
      renderFilms(listFilmsExtraContainerElements, filmsExtra, this._onDataChange, this._onViewChange);
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

      const newFilms = renderFilms(containerElement, this._films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._buttonShowMoreComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    switch (sortType) {
      case SortType.DATE:
        sortedFilms = this._films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
        break;
      case SortType.RAITING:
        sortedFilms = this._films.slice().sort((a, b) => a.raiting - b.raiting);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._films.slice();
        break;
    }
    this._listFilmsStandardContainerElement.innerHTML = ``;
    renderFilms(this._listFilmsStandardContainerElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    //this._films[index] = newData;

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
