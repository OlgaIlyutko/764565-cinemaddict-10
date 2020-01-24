import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getFormattedDuration} from '../utils/formatting';
import moment from 'moment';

const getWeekData = (data) => {
  const start = moment().subtract(`days`, 7);
  return data.filter((it) => moment(it.watchedDate).isAfter(start._d));
};
const getTodayData = (data) => {
  const start = moment().startOf(`day`);
  return data.filter((it) => moment(it.watchedDate).isAfter(start._d));
};
const getYearData = (data) => {
  const start = moment().subtract(`years`, 1);
  return data.filter((it) => moment(it.watchedDate).isAfter(start._d));
};
const getMonthData = (data) => {
  const start = moment().subtract(`months`, 1);
  return data.filter((it) => moment(it.watchedDate).isAfter(start._d));
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const renderGenreChart = (genreCtx, films) => {
  const genresLabels = films.map((film) => film.genres)
      .reduce((acc, genres) => {
        return acc.concat(Array.from(genres));
      }, [])
      .filter(getUniqItems);

  return new Chart(genreCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresLabels,
      datasets: [{
        data: genresLabels.map((genre) => films.reduce((acc, film) => {
          const targetFilmsCount = Array.from(film.genres)
            .filter((it) => it === genre).length;

          return acc + targetFilmsCount;
        }, 0)),
        backgroundColor: `rgb(255,255,0)`,
        borderWidth: 1,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 18
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          padding: 30
        }
      },
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
          }
        }],
        yAxes: [{
          barThickness: 30,
          ticks: {
            fontSize: 18,
            fontColor: `#ffffff`,
            padding: 60,
          }
        }]
      }
    }
  });
};

const getWatchedFilms = (films) => {
  return films.filter((it) => it.isWatched);
};

const getTotalDurationWatchedFilms = (films) => {
  return films.map((el) => el.duration)
      .reduce((a, b) => (a + b));
};


const getTopGenre = (films) => {
  return films.map((el) => el.genres)
    .reduce((acc, tags) => {
      return acc.concat(Array.from(tags));
    }, [])
    .reduce(
        (a, b, i, arr)=>
          (arr.filter((v) => v === a).length >= arr.filter((v)=>v === b).length ? a : b),
        null);
};

const createStatisticsTemplate = (watchedFilms) => {
  let durationHours = 0;
  let durationMin = 0;
  let topGenre = `-`;

  if (watchedFilms.length !== 0) {
    const totalDuration = getFormattedDuration(getTotalDurationWatchedFilms(watchedFilms));
    durationHours = totalDuration.slice(0, totalDuration.indexOf(`h`));
    durationMin = totalDuration.slice(totalDuration.indexOf(`h`) + 2, totalDuration.indexOf(`min`));
    topGenre = getTopGenre(watchedFilms);
  }

  const rank = document.querySelector(`.profile__rating`);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank.textContent}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time">
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationHours}<span class="statistic__item-description">h</span> ${durationMin ? durationMin : `0`} <span class="statistic__item-description">m</span></span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor({films}) {
    super();

    this._films = films;

    this._watchedFilms = getWatchedFilms(this._films.getFilmsAll());
    this._filteredData = this._watchedFilms;
    this._currentPeriod = `statistic-all-time`;

    this._genreChart = null;

    this._filterChangeHandler = (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }
      switch (evt.target.getAttribute(`for`)) {
        case `statistic-week`:
          this._currentPeriod = `statistic-week`;
          break;
        case `statistic-today`:
          this._currentPeriod = `statistic-today`;
          break;
        case `statistic-year`:
          this._currentPeriod = `statistic-year`;
          break;
        case `statistic-month`:
          this._currentPeriod = `statistic-month`;
          break;
        default:
          this._currentPeriod = `statistic-all-time`;
      }
      this.rerender();
    };

    this._films.setDataChangeHandler(() => {
      this.rerender();
      this.hide();
    });

  }

  _getChartData() {
    let filteredData;
    const watchedFilms = getWatchedFilms(this._films.getFilmsAll());
    switch (this._currentPeriod) {
      case `statistic-week`:
        filteredData = getWeekData(watchedFilms);
        break;
      case `statistic-today`:
        filteredData = getTodayData(watchedFilms);
        break;
      case `statistic-year`:
        filteredData = getYearData(watchedFilms);
        break;
      case `statistic-month`:
        filteredData = getMonthData(watchedFilms);
        break;
      default:
        filteredData = getWatchedFilms(this._films.getFilmsAll());
    }
    return filteredData;
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {}

  setActivePeriod() {
    const inputAll = document.querySelectorAll(`.statistic__filters-input`);

    const currentfilterStatButton = Array.from(inputAll).find((it) => {
      return it.id === this._currentPeriod;
    });

    currentfilterStatButton.checked = true;
  }

  rerender() {

    super.rerender();

    this.setActivePeriod();

    this._renderCharts();
    this._onActivePeriodStat();
  }

  _renderCharts() {

    const element = this.getElement();

    const genreCtx = element.querySelector(`.statistic__chart`);

    this._resetCharts();

    this._genreChart = renderGenreChart(genreCtx, this._getChartData());
  }

  _resetCharts() {
    if (this._genreChart) {
      this._genreChart.destroy();
      this._genreChart = null;
    }
  }

  _onActivePeriodStat() {
    this.getElement().addEventListener(`click`, this._filterChangeHandler);
  }

  getTemplate() {
    return createStatisticsTemplate(this._getChartData());
  }
}
