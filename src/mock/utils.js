const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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
  return new Intl.DateTimeFormat(`en-GB`, options).format(date);
};

const getFormatedDateTime = function () {
  const dateTime = getRandomDateTime();
  return `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1)}/${dateTime.getDay()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
};

const uppercaseFirst = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREEND: 
      container.prepend(element);
      break;
      case RenderPosition.AFTERBEGIN: 
      container.append(element);
      break;
  }  
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export {getRandomInt, getRandomFloat, getRandomArrayItem, getFormatedDate, getFormatedDateTime, getRandomDateTime, uppercaseFirst, render, RenderPosition, createElement};
