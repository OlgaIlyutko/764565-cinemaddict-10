import {uppercaseFirst} from '../mock/utils';

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(``);
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
    </nav>`
  );
};

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${uppercaseFirst(name)}<span class="main-navigation__item-count">${count}</span></a>`;
};
