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

const processStage = (stage) => {
  const startStats = stage.initialize();

  const nextMove = (stats) => {
    dialogs.moveInfo(stats);
    const container = stage.getCookies();

    const offerCookies = (cookies) => {
      if (cookies.available === 0) {
        return;
      }
      const meta = cookies.offer.map(([name, description]) => ({ name, description }));
      const index = dialogs.offerCookies(meta);
      if (index === -1) {
        return;
      }
      stage.addModifier(cookies.offer[index]);
      dialogs.moveInfo(stage.getStats());
      const rest = stage.getCookies(index);
      offerCookies(rest);
    };

    offerCookies(container);
    const result = stage.processMove();
    if (result.status === 'not-finished') {
      return nextMove(stage.getStats());
    }
    return result;
  };

  return nextMove(startStats);
};

const nextStage = (player) => {
  const stage = factory.createStage(player);
  dialogs.startStage(stage);
  const result = processStage(stage);
  switch (result.status) {
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
