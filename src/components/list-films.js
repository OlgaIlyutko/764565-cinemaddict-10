import {createElement} from '../mock/utils';

const createListFilmsTemplate = () => `<section class="films"></section>`;

export default class ListFilms {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createListFilmsTemplate();
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
