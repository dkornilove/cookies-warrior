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
  dialogs.startStage(stage);
  const result = processStage(stage);
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

const processStage = (stage) => {
  const startStats = stage.initialize();

  const nextMove = (stats) => {
    dialogs.moveInfo(stats);
    const container = stage.getCookies();

    const offerCookies = (cookies) => {
      const meta = cookies.map(([name, description]) => ({ name, description }));
      if (cookies.length === 0) {
        return;
      }
      const index = dialogs.offerCookies(meta);
      stage.addModifier(cookies[index]);
      if (index === -1) {
        return;
      }
      const rest = stage.getCookies(index);
      dialogs.moveInfo(stage.getStats());
      offerCookies(rest);
    };

    offerCookies(container);
    const result = stage.endMove();
  };

  return nextMove(startStats);
};

export default () => {
  const settings = greetings();
  if (!settings) {
    return;
  }
  const player = factory.createPlayer(settings);
  nextStage(player);
};
