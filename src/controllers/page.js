import FilmDetailsComponent from '../components/film-details';
import CardFilmComponent from '../components/card-film';
import ListFilmsStandardComponent from '../components/list-films-standard';
import ListFilmsExtraComponent from '../components/list-films-extra';
import ButtonShowMoreComponent from '../components/button-show-more';
import NoFilmsComponent from '../components/no-films';
import {generateFilms} from '../mock/card-film';
import {render, remove, RenderPosition} from '../utils/render.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (containerElement, film) => {
  const cardFilmComponent = new CardFilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const siteFooterElement = document.querySelector(`footer`);
  const filmPopapOpen = () => {
    render(siteFooterElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    filmDetailsComponent.setCloseButtonClickHandler(() => filmPopapClose());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmPopapClose = () => {
    remove(filmDetailsComponent);
  };

  cardFilmComponent.setImgClickHandler(() => filmPopapOpen());
  cardFilmComponent.setTitleClickHandler(() => filmPopapOpen());
  cardFilmComponent.setCommentsClickHandler(() => filmPopapOpen());

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmPopapClose();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(containerElement, cardFilmComponent, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._cardFilmComponent = new CardFilmComponent();
    this._listFilmsStandardComponent = new ListFilmsStandardComponent();
    this._listFilmsExtraTopRatedComponent = new ListFilmsExtraComponent(`Top rated`);
    this._listFilmsExtraMostCommentedComponent = new ListFilmsExtraComponent(`Most commented`);
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
  }

  render(films) {
    const container = this._container.getElement();

    render(container, this._listFilmsStandardComponent, RenderPosition.BEFOREEND);
    const listFilmsStandardElement = container.querySelector(`.films-list`);

    if (films.length === 0) {
      while (listFilmsStandardElement.firstChild) {
        listFilmsStandardElement.removeChild(listFilmsStandardElement.firstChild);
      }
      render(listFilmsStandardElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._listFilmsExtraTopRatedComponent, RenderPosition.BEFOREEND);
      render(container, this._listFilmsExtraMostCommentedComponent, RenderPosition.BEFOREEND);

      const listFilmsStandardContainerElement = listFilmsStandardElement.querySelector(`.films-list__container`);

      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      films.slice(0, showingFilmsCount).forEach((film) => renderFilm(listFilmsStandardContainerElement, film));

      render(listFilmsStandardElement, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

      const listFilmsExtraElements = container.querySelectorAll(`.films-list--extra`);
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
  }
}
