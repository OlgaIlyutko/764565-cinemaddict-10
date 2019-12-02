const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

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

const Genre = [
  `Western`,
  `Musical`,
  `Drama`,
  `Cartoon`,
  `Comedy`
];

const Emoji = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`];

const CommentText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Nice...nice`
  `Very very old. Meh`,
  `Not bad!`,
  `Almost two hours? Seriously?`
];

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length)];
};

const getRandomFIO = (count) => {
  Array.from({length: count}, () => `${getRandomArrayItem(Name)} ${getRandomArrayItem(Surname)}`).join(',');
};

const getRandomGenres = () => {
  Array.from({length: 3}, () => getRandomArrayItem(Genre));
};

const getRandomDateTime = () => {
  const fromDate = new Date(1900, 0, 1);
  const toDate = new Date();
  return new Date(fromDate.getTime() + Math.random() * (toDate.getTime() - fromDate.getTime()));
};

const getFormatedDate = function (date, options = {year:`numeric`, month: `long`, day: `numeric`}) {
  return new Intl.DateTimeFormat(`en-GB`, options).format(getRandomDateTime());
};

const getFormatedDateTime = function (date, options = {year:`numeric`, month: `numeric`, day: `numeric`, hour: `2-digit`, minute: `2-digit`}) {
  const dateTime = getRandomDateTime();
  console.log(dateTime);
  return `${dateTime.getFullYear()}/${(dateTime.getMonth()+1)}/${dateTime.getDay()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
};

const getRandomComments = () => {
  return Array.from({length: 4}, () => {
    return {
      img: getRandomArrayItem(Emoji),
      commentText: getRandomArrayItem(CommentText),
      commentAuthor: getRandomFIO(1),
      commentDay: getFormatedDateTime()
    };
  });
};

const generateFilmPopap = () => {
    const currentDate = new Date();
    return {
      poster: getRandomArrayItem(Posters),
      ageLimit: getRandomInt(0, 18),
      title: getRandomArrayItem(TitleFilm),
      originalTitle: this.title,
      raiting: getRandomFloat(0, 10),
      director: getRandomFIO(1),
      wtiters: getRandomFIO(3),
      actors: getRandomFIO(2),
      releaseDate: getFormatedDate(),
      duration: getDuration(),
      country: getRandomArrayItem(Country),
      genres: getRandomGenres(),
      description: descriptionString,
      isWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,      
      comments: getRandomComments()
    };
  };

export {generateFilmPopap};
