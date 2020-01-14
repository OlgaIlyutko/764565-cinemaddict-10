import {getRandomInt, getRandomFloat, getRandomArrayItem, getRandomDateTime} from '../utils/random';
import {getFormatedDateTime} from '../utils/formatting';

const GENRES = [
  `Western`,
  `Musical`,
  `Drama`,
  `Cartoon`,
  `Comedy`
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const TITLES_FILMS = [
  `Терминатор`,
  `Начало`,
  `Бойцовский клуб`,
  `Время`,
  `Огонь`,
  `Ужасы ночи`,
  `Тюленьчики`,
  `Кошки-мышки`,
  `Ремонт или жизнь`,
  `Муки из-за моков`
];

const NAME = [`Anthony`, `Anne`, `Heinz`, `Richard`, `Erich`, `Mary Beth`, `Dan`];

const SURNAME = [`Mann`, `Wigton`, `Herald`, `Weil`, `von Stroheim`, `Hughes`, `Duryea`];

const COUNTRY = [`USA`, `Russia`, `Estonia`, `Latvia`, `Sweden`, `Finland`];

const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`];

const COMMENT_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Nice...nice`,
  `Very very old. Meh`,
  `Not bad!`,
  `Almost two hours? Seriously?`
];

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const descriptionElements = descriptionString.split(`.`);

const getRandomGenres = (count) => {
  return Array.from({length: count}, () => getRandomArrayItem(GENRES));
};

const getRandomPosters = () => getRandomArrayItem(POSTERS);

const getRandomFIO = (count) => {
  return Array.from({length: count}, () => `${getRandomArrayItem(NAME)} ${getRandomArrayItem(SURNAME)}`).join(`, `);
};

const getRandomDescription = () => {
  return descriptionElements
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const getRandomComments = () => {
  const commentsCount = getRandomInt(0, 12);
  return Array.from({length: commentsCount}, () => {
    return {
      img: getRandomArrayItem(EMOJI),
      commentText: getRandomArrayItem(COMMENT_TEXT),
      commentAuthor: getRandomFIO(1),
      commentDay: getFormatedDateTime()
    };
  });
};

const generateFilm = () => {
  return {
    id: String(new Date() + Math.random()),
    poster: getRandomPosters(),
    ageLimit: getRandomInt(0, 18),
    title: getRandomArrayItem(TITLES_FILMS),
    raiting: getRandomFloat(0, 10),
    director: getRandomFIO(1),
    wtiters: getRandomFIO(3),
    actors: getRandomFIO(2),
    releaseDate: getRandomDateTime(),
    duration: getRandomInt(0, 100),
    country: getRandomArrayItem(COUNTRY),
    genres: getRandomGenres(1),
    description: getRandomDescription(),
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: getRandomComments()
  };
};

const generateFilms = (count) => {
  return Array.from({length: count}, () => generateFilm());
};

export {generateFilm, generateFilms};
