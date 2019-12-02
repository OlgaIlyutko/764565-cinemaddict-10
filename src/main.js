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
import {getUserRank} from './mock/user-rank';
import {generateFilmPopap} from './mock/film-details';

const FILMS_COUNT = 12;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, createUserRankTemplate(rank));

const siteMainElement = document.querySelector(`main`);
const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createListFilmsTemplate());

const listFilmsElement = siteMainElement.querySelector(`.films`);
render(listFilmsElement, createListFilmsStandardTemplate());

const listFilmsStandardElement = listFilmsElement.querySelector(`.films-list`);
const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
const films = generateFilms(FILMS_COUNT);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => render(listFilmsStandardContainerElement, createCardFilmTemplate(film)));

render(listFilmsStandardElement, createButtonShowMoreTemplate());

const renderFilmsListExtra = (thema) => {
  const filmsExtra = generateFilms(2);
  const filmsRender = filmsExtra.map((film) => createCardFilmTemplate(film)).join(``);
  return `
    <section class="films-list--extra">
      <h2 class="films-list__title">${thema}</h2>
      <div class="films-list__container">
      ${filmsRender}
      </div>
    </section>`;
};

render(listFilmsElement, renderFilmsListExtra(`Top rated`));
render(listFilmsElement, renderFilmsListExtra(`Most commented`));

const siteFooterElement = document.querySelector(`footer`);
const filmDetails = generateFilmPopap();
render(siteFooterElement, createFilmDetailsTemplate(filmDetails), `afterend`);

const loadMoreButton = listFilmsStandardElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(listFilmsStandardContainerElement, createCardFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
