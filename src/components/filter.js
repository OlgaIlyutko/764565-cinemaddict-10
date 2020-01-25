import {uppercaseFirst} from '../utils/formatting';
import AbstractComponent from './abstract-component';

export const MenuItem = {
  ALL: `all`,
  STATISTICS: `stats`,
};

const getFilterNameByHREF = (href) => {
  return href.slice(1);
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(``);
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All moves</a>
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${uppercaseFirst(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    const changeActiveClass = (evt) => {
      const filterButtonElement = document.querySelectorAll(`.main-navigation__item `);

      const currentfilterButton = Array.from(filterButtonElement).find((it) => {
        return it.classList.contains(`main-navigation__item--active`);
      });
      currentfilterButton.classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);
    };

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterElement = evt.target.getAttribute(`href`);
      const filterName = getFilterNameByHREF(filterElement);
      changeActiveClass(evt);

      handler(filterName);
    });
  }

  setMenuChangeHandler(handler) {
    if (!handler) {
      return;
    }
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`main-navigation__item`)) {
        return;
      }
      handler(evt.target.getAttribute(`href`).slice(1));
    });
  }
}
