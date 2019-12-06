import SortComponent from './components/sort';
import UserRankComponent from './components/user-rank';
import ListFilmsComponent from './components/list-films';
import ListFilmsStandardComponent from './components/list-films-standard';
import ListFilmsExtraComponent from './components/list-films-extra';
import FilterComponent from './components/filter';
import FilmDetailsComponent from './components/film-details';
import CardFilmComponent from './components/card-film';
import ButtonShowMoreComponent from './components/button-show-more';
import NoFilmsComponent from './components/no-films';
import {generateFilms} from './mock/card-film';
import {generateFilters} from './mock/filter';
import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './mock/utils';

const FILMS_COUNT = 12;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (containerElement, film) => {
  const cardFilmComponent = new CardFilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const posterFilm = cardFilmComponent.getElement().querySelector(`img`);
  const titleFilm = cardFilmComponent.getElement().querySelector(`.film-card__title`);
  const commentsFilm = cardFilmComponent.getElement().querySelector(`.film-card__comments`);
  const siteFooterElement = document.querySelector(`footer`);

  const filmPopapOpen = () => {
    render(siteFooterElement, filmDetailsComponent.getElement(), RenderPosition.AFTERBEGIN);
  };
  
  posterFilm.addEventListener(`click`, () => filmPopapOpen());
  titleFilm.addEventListener(`click`, () => filmPopapOpen());
  commentsFilm.addEventListener(`click`, () => filmPopapOpen());

  const filmPopapClose = () => {
    filmDetailsComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmPopapClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const closeFilmDetails = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeFilmDetails.addEventListener(`click`, () => filmPopapClose());

  render(containerElement, cardFilmComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank).getElement(), RenderPosition.AFTERBEGIN);

const siteMainElement = document.querySelector(`main`);
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.AFTERBEGIN);

render(siteMainElement, new SortComponent().getElement());

render(siteMainElement, new ListFilmsComponent().getElement(), RenderPosition.AFTERBEGIN);
const listFilmsElement = siteMainElement.querySelector(`.films`);

const films = generateFilms(FILMS_COUNT);
if (films.length == 0) {
  render(listFilmsElement, new NoFilmsComponent().getElement(), RenderPosition.AFTERBEGIN);
} else {
  render(listFilmsElement, new ListFilmsStandardComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(listFilmsElement, new ListFilmsExtraComponent(`Top rated`).getElement(), RenderPosition.AFTERBEGIN);
  render(listFilmsElement, new ListFilmsExtraComponent(`Most commented`).getElement(), RenderPosition.AFTERBEGIN);

  const listFilmsStandardElement = listFilmsElement.querySelector(`.films-list`);
  const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);
  const films = generateFilms(FILMS_COUNT);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount).forEach((film) => renderFilm(listFilmsStandardContainerElement, film));

  render(listFilmsStandardElement, new ButtonShowMoreComponent().getElement(), RenderPosition.AFTERBEGIN);

  const listFilmsExtraElements = listFilmsElement.querySelectorAll(`.films-list--extra`);
  listFilmsExtraElements.forEach((it) => {
    const listFilmsExtraContainerElements = it.querySelector(`.films-list__container`);
    const filmsExtra = generateFilms(2);
    filmsExtra.forEach((film) => renderFilm(listFilmsExtraContainerElements, film));
  });

  const loadMoreButton = listFilmsStandardElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(listFilmsStandardContainerElement, film));

    if (showingFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

