import {getFilmsByFilter} from '../utils/filter';
import {FilterType} from '../mock/filter';

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }
  
  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  deleteComment(id, numberComment) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    
    this._films[index].comments.splice(numberComment, 1);    
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    this._films[index] = film;

    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
