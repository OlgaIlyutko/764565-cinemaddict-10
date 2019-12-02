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
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomFloat = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const getRandomDateTime = () => {
  const fromDate = new Date(1900, 0, 1);
  const toDate = new Date();
  return new Date(fromDate.getTime() + Math.random() * (toDate.getTime() - fromDate.getTime()));
};

const getFormatedDate = function (date, options = {year: `numeric`, month: `long`, day: `numeric`}) {
  return new Intl.DateTimeFormat(`en-GB`, options).format(getRandomDateTime());
};

const getFormatedDateTime = function () {
  const dateTime = getRandomDateTime();
  return `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1)}/${dateTime.getDay()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
};

const getRandomGenres = (count) => {
  return Array.from({length: count}, () => getRandomArrayItem(Genre));
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

const getRandomPosters = () => getRandomArrayItem(Posters);

export {getRandomInt, getRandomFloat, getRandomArrayItem, getFormatedDate, getFormatedDateTime, getRandomGenres, getDuration, getRandomPosters};
