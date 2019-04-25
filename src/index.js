import dialogs from './data/dialogs';
import factory from './entities';
import difficulties from './data/difficulties';

const greetings = () => {
  const moods = Object.keys(difficulties);
  const name = dialogs.askName();
  dialogs.greetings(name);
  const index = dialogs.askForMood(moods);
  if (index === -1) {
    dialogs.bye(name);
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
      const cookiesMeta = cookies.offer.map(([meta]) => meta);
      const index = dialogs.offerCookies(cookiesMeta, cookies.available);
      if (index === -1) {
        return;
      }
      stage.applyModifier(cookies.offer[index]);
      dialogs.moveInfo(stage.getStats());
      const rest = stage.getCookies(index);
      offerCookies(rest);
    };

    offerCookies(container);
    const result = stage.processMove();
    dialogs.moveResult(result);
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
  const [artMeta] = factory.createArtefact(player);
  switch (result.status) {
    case 'dead':
      dialogs.dead(player);
      break;
    case 'passed':
      if (result.canContinue) {
        dialogs.passed(artMeta);
        nextStage(player);
      } else {
        dialogs.congrats(player.name);
      }
      break;
    case 'aborted':
      dialogs.bye(player.name);
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
