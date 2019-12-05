import {generateFilms} from './mock/card-film';
import {generateFilters} from './mock/filter';
import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './mock/utils';

import SortComponent from './components/sort';
import UserRankComponent from './components/user-rank';
import ListFilmsComponent from './components/list-films';
import ListFilmsStandardComponent from './components/list-films-standard';
import ListFilmsExtraComponent from './components/list-films-standard';
import FilterComponent from './components/filter';
import FilmDetailsComponent from './components/film-details';
import CardFilmComponent from './components/card-film';
import ButtonShowMoreComponent from './components/button-show-more';

const FILMS_COUNT = 12;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (film) => {
  const cardFilmComponent = new CardFilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const posterFilm = cardFilmComponent.querySelector('img');
  const titleFilm = cardFilmComponent.querySelector('.film-card__title');
  const commentsFilm = cardFilmComponent.querySelector('.film-card__comments');
  posterFilm.addEventListener('click', () => {
    listFilmsStandardContainerElement.replaceChild(filmDetailsComponent.getElement(), cardFilmComponent.getElement());
  });
  titleFilm.addEventListener('click', () => {
    listFilmsStandardContainerElement.replaceChild(filmDetailsComponent.getElement(), cardFilmComponent.getElement());
  });
  commentsFilm.addEventListener('click', () => {
    listFilmsStandardContainerElement.replaceChild(filmDetailsComponent.getElement(), cardFilmComponent.getElement());
  });

  const closeFilmDetails = filmDetailsComponent.querySelector('.film-details__close-btn');
  closeFilmDetails.addEventListener('click', () => {
    listFilmsStandardContainerElement.replaceChild(cardFilmComponent.getElement(), filmDetailsComponent.getElement());
  });

  render(listFilmsStandardContainerElement, new CardFilmComponent(film).getElement(), RenderPosition.BEFOREEND)
};

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`main`);
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SortComponent().getElement());

render(siteMainElement, new ListFilmsComponent().getElement(), RenderPosition.BEFOREEND);
const listFilmsElement = siteMainElement.querySelector(`.films`);
render(listFilmsElement, new ListFilmsStandardComponent().getElement(), RenderPosition.BEFOREEND);
render(listFilmsElement, new ListFilmsExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
render(listFilmsElement, new ListFilmsExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);

const listFilmsStandardElement = listFilmsElement.querySelector(`.films-list`);
const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
const films = generateFilms(FILMS_COUNT);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount).forEach((film) => renderFilm(film));
  
render(listFilmsStandardElement, new ButtonShowMoreComponent().getElement(), RenderPosition.BEFOREEND);

const listFilmsExtraElements = listFilmsElement.querySelectorAll(`.films-list--extra`);
listFilmsExtraElements.forEach((it) => {
  const listFilmsExtraContainerElements = it.querySelector(`.films-list__container`);
  const films = generateFilms(2);
  films.forEach((film) => render(listFilmsExtraContainerElements, new CardFilmComponent(film).getElement(), RenderPosition.BEFOREEND));
})

//const siteFooterElement = document.querySelector(`footer`);
/*const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, new FilmDetailsComponent(films[0]).getElement(), RenderPosition.AFTERBEGIN);*/

const loadMoreButton = listFilmsStandardElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilm(film));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
