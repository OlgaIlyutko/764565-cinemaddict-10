import AbstractSmartComponent from './abstract-smart-component';
import {uppercaseFirst} from '../utils/formatting';

const USER_RANKS = [
  {
    min: 0,
    max: 0,
    text: ``
  },
  {
    min: 1,
    max: 10,
    text: `novice`
  },
  {
    min: 11,
    max: 20,
    text: `fan`
  },
  {
    min: 21,
    max: 1000,
    text: `buff`
  }
];

const createUserRankTemplate = (rank) =>
  `<section class="header__profile profile">
    <p class="profile__rating">Movie ${uppercaseFirst(rank)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class UserRank extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;

    this._filmsModel.setDataChangeHandler(() => {
      this.rerender();
    });
  }

  getTemplate() {
    return createUserRankTemplate(this._getUserRank());
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();
  }

  _getUserRank() {
    const watchedFilms = this._filmsModel.getFilmsAll().filter((it) => it.isWatched);
    const userRankElement = USER_RANKS.find((it) => {
      return watchedFilms.length >= it.min && watchedFilms.length <= it.max;
    });
    return userRankElement.text;
  }
}
