import AbstractComponent from './abstract-component';

const createListFilmsExtraTemplate = (thema) =>
  `<section class="films-list--extra">
    <h2 class="films-list__title">${thema}</h2>
    <div class="films-list__container">
    </div>
  </section>`;

export default class ListFilmsExtra extends AbstractComponent {
  constructor(thema) {
    super();
    this._thema = thema;
  }

  getTemplate() {
    return createListFilmsExtraTemplate(this._thema);
  }
}
