
import UserRankComponent from './components/user-rank';

import PageController from './controllers/page';
import {generateFilms} from './mock/card-film';

import {getUserRank} from './mock/user-rank';
import {render, RenderPosition} from './utils/render';

const FILMS_COUNT = 12;

const siteHeaderElement = document.querySelector(`header`);
const rank = getUserRank();
render(siteHeaderElement, new UserRankComponent(rank), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`main`);


const films = generateFilms(FILMS_COUNT);
const pageController = new PageController(siteMainElement);
pageController.render(films);
