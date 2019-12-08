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

export {getRandomInt, getRandomFloat, getRandomArrayItem, getRandomDateTime};
