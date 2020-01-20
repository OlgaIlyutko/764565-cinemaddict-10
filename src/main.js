import API from './api.js';
import FilterController from './controllers/filter.js';
import UserRankComponent from './components/user-rank';
import MoviesModel from './models/movies';
import PageController from './controllers/page';
import StatisticsComponent from './components/statistics';
import {render, RenderPosition} from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;

const api = new API(END_POINT, AUTHORIZATION);
const filmsModel = new MoviesModel();
const siteHeaderElement = document.querySelector(`header`);


const siteMainElement = document.querySelector(`main`);

const filterController = new FilterController(siteMainElement, filmsModel);
const pageController = new PageController(siteMainElement, filmsModel, api);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filterController.render();
    pageController.render();

    render(siteHeaderElement, new UserRankComponent(filmsModel), RenderPosition.BEFOREEND);
    const statisticsComponent = new StatisticsComponent({films: filmsModel});
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
    statisticsComponent.hide();

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
  });
