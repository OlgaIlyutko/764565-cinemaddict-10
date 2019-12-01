import {createUserRankTemplate} from './components/user-rank';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createListFilmsTemplate} from './components/list-films';
import {createListFilmsStandardTemplate} from './components/list-films-standard';
import {createCardFilmTemplate} from './components/card-film';
import {createButtonShowMoreTemplate} from './components/button-show-more';
import {createFilmDetailsTemplate} from './components/film-details';
import {generateFilms} from './mock/card-film';
import {generateFilters} from './mock/filter';

const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createUserRankTemplate());

const siteMainElement = document.querySelector(`main`);
const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createListFilmsTemplate());

const listFilmsElement = siteMainElement.querySelector(`.films`);
render(listFilmsElement, createListFilmsStandardTemplate());

const listFilmsStandardElement = listFilmsElement.querySelector(`.films-list`);
const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
const films = generateFilms(5);
films.forEach((film) => render(listFilmsStandardContainerElement, createCardFilmTemplate(film)));

render(listFilmsStandardElement, createButtonShowMoreTemplate());

const renderFilmsListExtra = (thema) => {
  const filmsExtra = generateFilms(2);
  return `
    <section class="films-list--extra">
      <h2 class="films-list__title">${thema}</h2>
      <div class="films-list__container">
      ${createCardFilmTemplate(filmsExtra[0])}
      ${createCardFilmTemplate(filmsExtra[1])}
      </div>
    </section>`;
};

render(listFilmsElement, renderFilmsListExtra(`Top rated`));
render(listFilmsElement, renderFilmsListExtra(`Most commented`));

const siteFooterElement = document.querySelector(`footer`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
