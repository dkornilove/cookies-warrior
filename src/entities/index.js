import Player from './player';
import Cookie from './cookie';

export const createCookiesContainer = (count) => {
  const cookiesContainer = [];
  for (let i = 0; i < count; i += 1) {
    const cookie = new Cookie();
    cookiesContainer.push(cookie);
  }
};

export const createPlayer = ({ name, difficulty }) => {
  const cookiesContainer = createCookiesContainer(difficulty.cookiesCount);
  return new Player({ name, difficulty, cookiesContainer });
};
