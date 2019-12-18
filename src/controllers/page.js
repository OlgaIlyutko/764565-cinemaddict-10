import ListFilmsStandardComponent from '../components/list-films-standard';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ButtonShowMoreComponent from '../components/button-show-more';
import NoFilmsComponent from '../components/no-films';
import FilmsBlockComponent from '../components/films-block';
import FilterComponent from '../components/filter';
import SortComponent, {SortType} from '../components/sort';
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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

   
    this._defaultFilms = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._showedFilmsControllers = [];

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (!this._defaultFilms.length) {
      this._defaultFilms = films.slice();
    }

    const container = this._container;

    //render(container, new FilterComponent(films), RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsBlockComponent, RenderPosition.BEFOREEND);

    const filmsBlock = this._filmsBlockComponent.getElement();
    render(filmsBlock, this._listFilmsStandardComponent, RenderPosition.BEFOREEND);
    const listFilmsStandardElement = this._listFilmsStandardComponent.getElement();

    const isNoFilms = films.length === 0;
    if (isNoFilms) {
      while (listFilmsStandardElement.firstChild) {
        listFilmsStandardElement.removeChild(listFilmsStandardElement.firstChild);
      }
      render(listFilmsStandardElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(filmsBlock, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(filmsBlock, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    //this._listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
  
    this._showedFilmsControllers = renderFilms(this._listFilmsStandardContainerElement, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);

    this._renderButtonShowMoreComponent();

    const listFilmsExtraTopRatedElement = this._listFilmsExtraTopRatedComponent.getElement().querySelector(`.films-list__container`);
    const filmsTopRated = films.slice().sort((a, b) => b.raiting - a.raiting);
    renderFilms(listFilmsExtraTopRatedElement, filmsTopRated.slice(0, 2), this._onDataChange, this._onViewChange);

    const listFilmsExtraMostCommentedElement = this._listFilmsExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    const filmsMostCommented = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderFilms(listFilmsExtraMostCommentedElement, filmsMostCommented.slice(0, 2), this._onDataChange, this._onViewChange);

  }

  _renderButtonShowMoreComponent() {
 
  
    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._listFilmsStandardComponent.getElement(), this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setButtonClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
      const films = this._filmsModel.getFilms();

      const newFilms = renderFilms(this._listFilmsStandardContainerElement, films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingFilmsCount >= films.length) {
        remove(this._buttonShowMoreComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._filmsModel.getFilms();
    switch (sortType) {
      case SortType.DATE:
        sortedFilms = films.sort((a, b) => a.releaseDate - b.releaseDate);
        break;
      case SortType.RAITING:
        sortedFilms = films.sort((a, b) => a.raiting - b.raiting);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._defaultFilms.slice();
        break;
    }
    this._listFilmsStandardContainerElement.innerHTML = ``;
    renderFilms(this._listFilmsStandardContainerElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);
   
    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _removeFilms() {
    this._listFilmsStandardContainerElement.innerHTML = ``;
    this._showedFilmsControllers = [];
  }

  _onFilterChange() {
    this._removeFilms();
    renderFilms(this._listFilmsStandardContainerElement, this._filmsModel.getFilms().slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._renderButtonShowMoreComponent();
  }
}
