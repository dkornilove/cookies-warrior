import readline from 'readline-sync';
import chalk from 'chalk';

const ask = readline.question;
const askKey = readline.keyInSelect;
const { log } = console;
const {
  bold, italic, red, blueBright, greenBright, redBright, grey, yellow, green,
} = chalk;

const statsToString = stats => `${red.bold('\u2665')} ${bold(stats.hp)} ${chalk.blue.bold('\u2666')} ${bold(
  stats.def,
)} ${greenBright.bold('\u2699')} ${bold(stats.res)}`;
const createDescription = (mod) => {
  const endings = {
    boost: `until the end of the ${green('turn')}`,
    patch: `until the end of the ${red('fight')}`,
    break: '',
  };
  const ending = endings[mod.modificators[0].method];

  return `[${mod.meta} ${mod.modificators
    .map(
      m => `${m.value > 0 ? bold.green(`${m.value}`) : bold.redBright(m.value)} ${m.target} ${
        m.attribute
      } `,
    )
    .join('')}${ending}]`.trim();
};
const colors = {
  1: bold.bgBlack.whiteBright,
  0.8: bold.bgBlack.blueBright,
  0.4: bold.bgBlack.magentaBright,
  0.2: bold.bgBlack.yellowBright,
};

const handleCookies = cookies => cookies.map(c => `${colors[c.rarity](c.name)} ${italic(createDescription(c))}`);

export default {
  askName: () => ask(`Greetings, traveler! What is your name? ${grey.italic('enter your name ')}`, {
    defaultInput: 'Stranger',
  }),
  greetings: user => ask(
    `Well, ${blueBright(user)}, I hope you love cookies! And monsters.. ${bold.italic(
      'Slashing monsters!',
    )}`,
  ),
  askForMood: moods => askKey(moods, `How do you feel yourself today? ${grey.italic('difficulty')}`, {
    cancel: 'No more murders today',
  }),
  bye: name => log(`
  Well, ${blueBright(name)}, I hope you will come back to clear this cursed place!`),
  preStart: (mood, user) => ask(
    `Great, ${italic(mood.toLowerCase())} ${blueBright(
      user,
    )}! Lets find out what are you made of!`,
  ),

  startStage: stage => ask(`
  Stage ${bold(stage.player.currentlevel)}/${bold(stage.player.difficulty.levels)}:
     You come to ${greenBright(stage.modifier.name)} 
     ${italic(createDescription(stage.modifier))} 
     and meet ${redBright(stage.monster.name)}`),
  moveInfo: stats => ask(`
  ${bold('On the end of the turn')}:
    You ${statsToString(stats.player)} will ${bold.italic.redBright(stats.playerplan)}. 
    And monster ${statsToString(stats.monster)} plans to ${bold.italic.blueBright(
  stats.monsterplan,
)}`),
  offerCookies: cookies => askKey(
    handleCookies(cookies.offer),
    `Chose a cookie to eat. You have ${bold.bgYellowBright.black(
      cookies.available,
    )} cookies left!`,
  ),
  moveResult: ({ message: { monsterModifier, playerModifier, cookiesCount } }) => ask(`
    Monster used ${redBright(monsterModifier.name)} ${italic(createDescription(monsterModifier))}.${
  playerModifier
    ? ` 
    You used ${red(playerModifier.name)} ${italic(createDescription(playerModifier))}.`
    : ''
} 
    ${grey(`${cookiesCount} cookies left`)}`),
  passed: artefact => ask(
    bold(`
  You have slashed the monster and got ${yellow(artefact.name)} 
  ${italic(createDescription(artefact))}`),
  ),
  dead: () => ask(bold.red('YOU DIED!')),
  congrats: name => ask(
    bold.green(
      `Thank you, ${blueBright(name)}! You have cleared this cursed place! ${grey('For now..')}`,
    ),
  ),
};
