import dialogs from './data/dialogs';
import factory from './entities';
import difficulties from './data/difficulties';

const onGameStart = () => {
  const moods = Object.keys(difficulties);
  const name = dialogs.askName();
  dialogs.greetings(name);
  const index = dialogs.askForMood(moods);
  if (index === -1) {
    dialogs.bye();
    return null;
  }
  dialogs.preStart(moods[index], name);

  return { name, difficulty: moods[index] };
};

export default () => {
  const state = onGameStart();
  if (!state) {
    return;
  }
  factory.createPlayer(state);
};
