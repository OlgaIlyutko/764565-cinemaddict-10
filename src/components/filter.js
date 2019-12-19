import {uppercaseFirst} from '../utils/formatting';
import AbstractComponent from './abstract-component';

const getFilterNameByHREF = (href) => {
  return href.slice(1);
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(``);
  return (
    `<nav class="main-navigation">
    
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

//<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>

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
      const filterButton = document.querySelectorAll(`.main-navigation__item `);

      const currentfilterButton = Array.from(filterButton).find((it) => {
        return it.classList.contains(`main-navigation__item--active`);
      });
      currentfilterButton.classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);
    };

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const filterElement = evt.target.getAttribute('href');
      const filterName = getFilterNameByHREF(filterElement);
      changeActiveClass(evt);   

      handler(filterName);
    });
  }
}
