import {getRandomDateTime} from '../utils/random';

const getFormatedDate = function (date, options = {year: `numeric`, month: `long`, day: `numeric`}) {
  return new Intl.DateTimeFormat(`en-GB`, options).format(date);
};

const getFormatedDateTime = function () {
  const dateTime = getRandomDateTime();
  return `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1)}/${dateTime.getDay()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
};

const uppercaseFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export {getFormatedDate, getFormatedDateTime, uppercaseFirst};
