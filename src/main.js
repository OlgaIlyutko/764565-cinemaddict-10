import API from './api.js';
import FilterController from './controllers/filter.js';
import UserRankComponent from './components/user-rank';
import MoviesModel from './models/movies';
import PageController from './controllers/page';
import StatisticsComponent from './components/statistics';
import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;

const api = new API(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`main`);

const filmsModel = new MoviesModel();

//const statisticsComponent = new StatisticsComponent({films: filmsModel});
//render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, filmsModel);

//statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
  });

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

filterController.setMenuChangeHadler((menuItem) => {
  switch (menuItem) {
    case `stats`:
      pageController.hide();
      //statisticsComponent.show();
      break;
    default:
      //statisticsComponent.hide();
      pageController.show();
      break;
  }
});
