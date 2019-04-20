import dialogs from './data/dialogs';
import factory from './entities';
import difficulties from './data/difficulties';

const greetings = () => {
  const moods = Object.keys(difficulties);
  const name = dialogs.askName();
  dialogs.greetings(name);
  const index = dialogs.askForMood(moods);
  if (index === -1) {
    dialogs.bye();
    return null;
  }
  const mood = moods[index];
  dialogs.preStart(mood, name);

  return {
    name,
    difficulty: difficulties[mood],
  };
};

const nextStage = (player) => {
  const stage = factory.createStage(player);
  const result = stage.start();
  switch (result.message) {
    case 'dead':
      dialogs.dead(player);
      break;
    case 'passed':
      nextStage(result.player);
      break;
    case 'aborted':
      dialogs.bye();
      break;
    default:
      dialogs.wrong();
  }
};

export default () => {
  const settings = greetings();
  if (!settings) {
    return;
  }
  const player = factory.createPlayer(settings);
  nextStage(player);
};
