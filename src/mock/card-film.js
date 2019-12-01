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

const Genre = [
  `Western`,
  `Musical`,
  `Drama`,
  `Cartoon`,
  `Comedy`
];

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const getRandomInt = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomFloat = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length)];
};

const getDuration = () => {
  const durationMinutes = getRandomInt(0, 100);
  let durationFormating = ``;
  if (durationMinutes >= 60) {
    durationFormating += `${Math.floor(durationMinutes / 60)}h`;
  }
  if (durationMinutes % 60 !== 0) {
    durationFormating += ` ${durationMinutes % 60}min`;
  }
  return durationFormating;
};

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const descriptionElements = descriptionString.split(`.`);
const getRandomDescription = () => {
  return descriptionElements
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const getRandomComments = () => {
  return `${getRandomInt(1, 100)} comments`;
};

const generateFilm = () => {
  const currentDate = new Date();
  return {
    title: getRandomArrayItem(TitleFilm),
    raiting: getRandomFloat(0, 10),
    year: getRandomInt(1900, currentDate.getFullYear()),
    duration: getDuration(),
    genre: getRandomArrayItem(Genre),
    poster: getRandomArrayItem(Posters),
    description: getRandomDescription(),
    comments: getRandomComments(),
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

const generateFilms = (count) => {
  return Array.from({length: count}, () => generateFilm());
};

export {generateFilm, generateFilms};
