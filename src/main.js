import SortComponent from './components/sort';
import UserRankComponent from './components/user-rank';
import FilmsBlockComponent from './components/films-block';
import FilterComponent from './components/filter';
import PageController from './controllers/page';
import {generateFilms} from './mock/card-film';
import {generateFilters} from './mock/filter';
import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './utils/render';

const FILMS_COUNT = 12;

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`main`);
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const filmsBlockComponent = new FilmsBlockComponent();
render(siteMainElement, filmsBlockComponent, RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_COUNT);
const pageController = new PageController(filmsBlockComponent);
pageController.render(films);
