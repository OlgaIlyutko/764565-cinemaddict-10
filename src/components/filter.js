import {uppercaseFirst} from '../utils/formatting';
import AbstractComponent from './abstract-component';
import {generateFilters} from '../mock/filter';

const createFilterTemplate = (films) => {
  const filters = generateFilters(films);
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(``);
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${uppercaseFirst(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export default class Filter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createFilterTemplate(this._films);
  }
}
