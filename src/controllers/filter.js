import FilterComponent from '../components/filter.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getFilmsByFilter} from '../utils/filter.js';

const FilterType = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);

    this._pageSwapHandler = null;
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    this._filterComponent.setMenuChangeHandler(this._pageSwapHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }

  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }

  setMenuChangeHandler(handler) {
    this._pageSwapHandler = handler;
    this._filterComponent.setMenuChangeHandler(handler);
  }
}
