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
      const index = dialogs.offerCookies(cookies);
      if (index === -1) {
        return 'move end';
      }
      const result = stage.processCookie(index);
      dialogs.moveInfo(stage.getStats());
      if (result === 'next') {
        const rest = stage.getCookies();
        return offerCookies(rest);
      } return result;
    };

    const cookiesResult = offerCookies(container);

    if (cookiesResult === 'move end') {
      const result = stage.processMove();
      dialogs.moveResult(result);
      if (result.status === 'not-finished') {
        return nextMove(stage.getStats());
      }
      return result;
    }
    return cookiesResult;
  };

  return nextMove(startStats);
};

const nextStage = (player) => {
  const stage = factory.createStage(player);
  dialogs.startStage(stage);
  const result = processStage(stage);
  const artefact = factory.createArtefact(player);
  switch (result.status) {
    case 'dead':
      dialogs.dead(player);
      break;
    case 'passed':
      if (result.canContinue) {
        dialogs.passed(artefact);
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
