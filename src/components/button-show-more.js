import AbstractComponent from './abstract-component';

const createButtonShowMoreTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }

  setButtonClickHandler(handler) {
    this.getElement()
      .addEventListener(`click`, handler);
  }
}
