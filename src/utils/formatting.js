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
  const duration = moment.duration(durationMinutes, `minutes`);
  const [hours, minutes] = [duration.get(`hours`), duration.get(`minutes`)];
  return `${(hours > 0) ? `${hours}h ` : ``}${minutes}min`;
};

export {getFormatedDate, getFormatedDateTime, uppercaseFirst, getFormattedDuration};
