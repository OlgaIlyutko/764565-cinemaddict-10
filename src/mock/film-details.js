import {getRandomInt, getRandomFloat, getRandomArrayItem, getFormatedDate, getFormatedDateTime, getRandomGenres, getDuration, getRandomPosters} from './utils';

const COMMENTS_COUNT = 4;

const TitleFilm = [
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

const Name = [`Anthony`, `Anne`, `Heinz`, `Richard`, `Erich`, `Mary Beth`, `Dan`];

const Surname = [`Mann`, `Wigton`, `Herald`, `Weil`, `von Stroheim`, `Hughes`, `Duryea`];

const Country = [`USA`, `Russia`, `Estonia`, `Latvia`, `Sweden`, `Finland`];

const Emoji = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`];

const CommentText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Nice...nice`,
  `Very very old. Meh`,
  `Not bad!`,
  `Almost two hours? Seriously?`
];

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomFIO = (count) => {
  return Array.from({length: count}, () => `${getRandomArrayItem(Name)} ${getRandomArrayItem(Surname)}`).join(`, `);
};

const getRandomComments = () => {
  return Array.from({length: COMMENTS_COUNT}, () => {
    return {
      img: getRandomArrayItem(Emoji),
      commentText: getRandomArrayItem(CommentText),
      commentAuthor: getRandomFIO(1),
      commentDay: getFormatedDateTime()
    };
  });
};

const generateFilmPopap = () => {
  return {
    poster: getRandomPosters(),
    ageLimit: getRandomInt(0, 18),
    title: getRandomArrayItem(TitleFilm),
    raiting: getRandomFloat(0, 10),
    director: getRandomFIO(1),
    wtiters: getRandomFIO(3),
    actors: getRandomFIO(2),
    releaseDate: getFormatedDate(),
    duration: getDuration(),
    country: getRandomArrayItem(Country),
    genres: getRandomGenres(3),
    description: descriptionString,
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: getRandomComments()
  };
};

export {generateFilmPopap};
