import {getRandomDateTime} from '../utils/random';
import moment from 'moment';

const getFormatedDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getFormatedDateTime = function () {
  const dateTime = getRandomDateTime();
  return moment(dateTime).format(`YYYY/MM/DD HH:MM`);
};

const formateDateTime = function (dateTime) {
  return moment(dateTime).format(`YYYY/MM/DD HH:MM`);
};

const formateDateYear = function (dateTime) {
  return moment(dateTime).format(`YYYY`);
};


const uppercaseFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getFormattedDuration = (durationMinutes) => {
  const duration = moment.duration(durationMinutes, `minutes`);
  const [hours, minutes] = [duration.get(`hours`), duration.get(`minutes`)];
  return `${(hours > 0) ? `${hours}h ` : ``}${(minutes > 0) ? `${minutes}min` : ``}`;
};

export {getFormatedDate, getFormatedDateTime, uppercaseFirst, getFormattedDuration, formateDateTime, formateDateYear};
