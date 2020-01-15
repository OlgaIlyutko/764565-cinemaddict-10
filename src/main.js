import FilterController from './controllers/filter.js';
import UserRankComponent from './components/user-rank';
import MoviesModel from './models/movies';
import PageController from './controllers/page';
import StatisticsComponent from './components/statistics';
import {generateFilms} from './mock/card-film';
import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './utils/render';

const FILMS_COUNT = 12;

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`main`);

const films = generateFilms(FILMS_COUNT);
const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const statisticsComponent = new StatisticsComponent({films: filmsModel});
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, filmsModel);

statisticsComponent.hide();
pageController.render();


filterController.setMenuChangeHadler((menuItem) => {
  switch (menuItem) {
    case `stats`:
      pageController.hide();
      statisticsComponent.show();
      break;
    default:
      statisticsComponent.hide();
      pageController.show();
      break;
  }
});


