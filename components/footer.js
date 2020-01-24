import AbstractComponent from './abstract-component.js';

export default class Footer extends AbstractComponent {
  constructor(moviesLength) {
    super();
    this._moviesLength = moviesLength;
  }
  getTemplate() {
    return `<footer class="footer">
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${this._moviesLength} movies inside</p>
    </section>
    </footer>`;
  }
}
