import moment from 'moment';

const getFormatedDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formateDateTime = (dateTime) => {
  return moment(dateTime).format(`YYYY/MM/DD HH:MM`);
};

const formateDateYear = (dateTime) => {
  return moment(dateTime).format(`YYYY`);
};

const uppercaseFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getFormattedDuration = (durationMinutes) => {
  const duration = moment.duration(durationMinutes, `minutes`);
  const [hours, minutes] = [duration.hours() + duration.days() * 24, duration.minutes()];
  return `${(hours > 0) ? `${hours}h ` : ``}${(minutes > 0) ? `${minutes}min` : ``}`;
};

export {getFormatedDate, uppercaseFirst, getFormattedDuration, formateDateTime, formateDateYear};
