import {getRandomInt} from '../utils/random';

const UserRank = [
  {
    min: 0,
    max: 0,
    text: ``
  },
  {
    min: 1,
    max: 10,
    text: `novice`
  },
  {
    min: 11,
    max: 20,
    text: `fan`
  },
  {
    min: 21,
    max: 1000,
    text: `buff`
  }
];

const getUserRank = () => {
  const randomUserRank = getRandomInt(0, 50);
  const userRankElement = UserRank.find((it) => {
    return randomUserRank >= it.min && randomUserRank <= it.max;
  });
  return userRankElement.text;
};

export {getUserRank};
