import AbstractComponent from './abstract-component';

const createFilmsBlockTemplate = () => `<section class="films"></section>`;

export default class FilmsBlock extends AbstractComponent {
  getTemplate() {
    return createFilmsBlockTemplate();
  }
}
