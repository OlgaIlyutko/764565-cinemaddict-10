import {getRandomDateTime} from '../utils/random';
import moment from 'moment';

const getFormatedDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getFormatedDateTime = function () {
  const dateTime = getRandomDateTime();
  return moment(dateTime).format(`YYYY/MM/DD HH:MM`);
};

const uppercaseFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getFormattedDuration = (durationMinutes) => {
  return `${(durationMinutes >= 60) ? `${Math.floor(durationMinutes / 60)}h` : ``}${(durationMinutes % 60 !== 0) ? ` ${durationMinutes % 60}min` : ``}`;
};

export {getFormatedDate, getFormatedDateTime, uppercaseFirst, getFormattedDuration};
