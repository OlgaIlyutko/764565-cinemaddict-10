import AbstractComponent from './abstract-component';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    const changeActiveClass = (evt) => {
      const sortButton = document.querySelectorAll(`.sort__button`);

      const currentSortButton = Array.from(sortButton).find((it) => {
        return it.dataset.sortType === this._currentSortType;
      });
      currentSortButton.classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);
    };

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      changeActiveClass(evt);

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }

}
