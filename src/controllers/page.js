import ButtonShowMoreComponent from '../components/button-show-more';
import FilmsBlockComponent from '../components/films-block';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ListFilmsStandardComponent from '../components/list-films-standard';
import NoFilmsComponent from '../components/no-films';
import SortComponent from '../components/sort';
import {remove, render, RenderPosition} from '../utils/render.js';
import MovieController from './movie';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (containerElement, films, onDataChange, onViewChange, api) => {
  return films.map((film) => {
    const filmController = new MovieController(containerElement, onDataChange, onViewChange, api);
    filmController.render(film);

    return filmController;
  });
};

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;
    this._defaultFilms = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._showedFilmsControllers = [];

    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();

    this._sortComponent.setSortChangeHandler((sortType) => filmsModel.setSort(sortType));

    this._filmsBlockComponent = new FilmsBlockComponent();
    this._listFilmsStandardComponent = new ListFilmsStandardComponent();
    this._listFilmsExtraTopRatedComponent = new ListFilmsExtraComponent(`Top rated`);
    this._listFilmsExtraMostCommentedComponent = new ListFilmsExtraComponent(`Most commented`);
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();

    this._listFilmsStandardContainerElement = this._listFilmsStandardComponent.getElement().querySelector(`.films-list__container`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._filterSortRender = this._filterSortRender.bind(this);

    this._filmsModel.setSortChangeHandler(this._filterSortRender);
    this._filmsModel.setFilterChangeHandler(this._filterSortRender);

  }

  hide() {
    this._sortComponent.hide();
    this._filmsBlockComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsBlockComponent.show();
  }

  render() {
    const films = this._filmsModel.getFilms();
    const container = this._container;

    if (!this._defaultFilms.length) {
      this._defaultFilms = films.slice();
    }

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

    this._showedFilmsControllers = renderFilms(this._listFilmsStandardContainerElement, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange, this._api);
    this._renderButtonShowMore();
    this._renderExtraBlock();
  }

  _renderExtraBlock() {
    const films = this._filmsModel._films;
    const filmsBlock = this._filmsBlockComponent.getElement();

    render(filmsBlock, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
    render(filmsBlock, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

    const listFilmsExtraTopRatedElement = this._listFilmsExtraTopRatedComponent.getElement().querySelector(`.films-list__container`);
    const filmsTopRated = films.slice().sort((a, b) => b.rating - a.rating);
    renderFilms(listFilmsExtraTopRatedElement, filmsTopRated.slice(0, 2), this._onDataChange, this._onViewChange, this._api);

    const listFilmsExtraMostCommentedElement = this._listFilmsExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    const filmsMostCommented = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderFilms(listFilmsExtraMostCommentedElement, filmsMostCommented.slice(0, 2), this._onDataChange, this._onViewChange, this._api);
  }

  _renderButtonShowMore() {
    remove(this._buttonShowMoreComponent);
    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._listFilmsStandardComponent.getElement(), this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setButtonClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
      const films = this._filmsModel.getFilms();

      const newFilms = renderFilms(this._listFilmsStandardContainerElement, films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange, this._api);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingFilmsCount >= films.length) {
        remove(this._buttonShowMoreComponent);
      }
    });
  }

  _removeFilms() {
    this._listFilmsStandardContainerElement.innerHTML = ``;
    this._showedFilmsControllers = [];
  }

  _filterSortRender() {//вопрос - нужно ли тут название с on
    this._removeFilms();
    const films = this._filmsModel.getFilms();
    this._showedFilmsControllers = renderFilms(this._listFilmsStandardContainerElement, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange, this._api);
    this._renderButtonShowMore();
  }

  _onDataChange(filmController, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
        .then((updatedFilm) => {
          const isSuccess = this._filmsModel.updateFilm(oldData.id, updatedFilm);

          if (isSuccess) {
            filmController.render(updatedFilm);
            remove(this._listFilmsExtraTopRatedComponent);
            remove(this._listFilmsExtraMostCommentedComponent);
            this._renderExtraBlock();
            this._filterSortRender();
          }
        });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
