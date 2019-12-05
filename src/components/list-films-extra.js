import {createElement} from '../mock/utils';

const createListFilmsExtraTemplate = (thema) =>
  `<section class="films-list--extra">
    <h2 class="films-list__title">${thema}</h2>
    <div class="films-list__container">
    </div>
  </section>`;

export default class ListFilmsExtra {
  constructor(thema) {
    this._element = null;
    this._thema = thema;
  }
  getTemplate() {
    return createListFilmsExtraTemplate(this._thema);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
