import {uppercaseFirst} from '../utils/formatting';
import AbstractComponent from './abstract-component';

const createUserRankTemplate = (rank) =>
  `<section class="header__profile profile">
    <p class="profile__rating">Movie ${uppercaseFirst(rank)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class UserRank extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }
  getTemplate() {
    return createUserRankTemplate(this._rank);
  }
}
