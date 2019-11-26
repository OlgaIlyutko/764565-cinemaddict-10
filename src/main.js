import {createUserRankTemplate} from './components/user-rank';
import {createMenuTemplate} from './components/menu';
import {createSortTemplate} from './components/sort';
import {createListFilmsTemplate} from './components/list-films';
import {createListFilmsStandardTemplate} from './components/list-films-standard';
import {createCardFilmTemplate} from './components/card-film';
import {createButtonShowMoreTemplate} from './components/button-show-more';
import {createFilmDetailsTemplate} from './components/film-details';


const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createUserRankTemplate());

const siteMainElement = document.querySelector(`main`);
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createListFilmsTemplate());

const listFilmsElement = siteMainElement.querySelector(`.films`);
render(listFilmsElement, createListFilmsStandardTemplate());

const listFilmsStandardElement = listFilmsElement.querySelector(`.films-list`);
const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
Array.from({length: 5}, () => render(listFilmsStandardContainerElement, createCardFilmTemplate()));

render(listFilmsStandardElement, createButtonShowMoreTemplate());

const renderFilmsListExtra = (thema) =>
  `<section class="films-list--extra">
      <h2 class="films-list__title">${thema}</h2>
      <div class="films-list__container">
      ${Array.from({length: 2}, () => createCardFilmTemplate())}
      </div>
  </section>`;

render(listFilmsElement, renderFilmsListExtra(`Top rated`));
render(listFilmsElement, renderFilmsListExtra(`Most commented`));

const siteFooterElement = document.querySelector(`footer`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
