import readline from 'readline-sync';
import chalk from 'chalk';

const ask = readline.question;
const askKey = readline.keyInSelect;
const { log } = console;
const {
  bold, italic, red, blueBright, greenBright, redBright, bgYellowBright, grey,
} = chalk;
const handleCookies = cookies => cookies.map(([name, desc]) => `${bgYellowBright.black.bold(name)} [${italic(desc)}]`);
const statsToString = stats => `${red.bold('\u2665')}${bold(stats.hp)} ${chalk.blue.bold('\u2666')}${bold(stats.def)} ${greenBright.bold('\u2699')}${bold(stats.res)}`;

export default {
  askName: () => ask(`Greetings, traveler! What is your name? ${grey.italic('enter your name ')}`, { defaultInput: 'Stranger' }),
  greetings: user => ask(`Well, well, ${blueBright(user)}, I hope you love cookies! And monsters.. ${bold.italic('Slashing monsters!')}`),
  askForMood: moods => askKey(moods, `How do you feel yourself today? ${grey.italic('difficulty')}`, {
    cancel: 'No more murders today',
  }),
  bye: name => log(`Well, ${blueBright(name)}, I hope you will come back to clear this cursed place!`),
  preStart: (mood, user) => ask(`Great, ${italic(mood.toLowerCase())} ${blueBright(user)}! Lets find out what are you made of!`),

  startStage: stage => ask(`Stage ${bold(stage.player.currentlevel)}/${bold(stage.player.difficulty.levels)}.
     You come to ${greenBright(stage.name)} [${italic(stage.description)}] and meet ${redBright(stage.monster.name)}`),
  moveInfo: stats => ask(`${bold('On the end of turn')}:
    You ${statsToString(stats.player)} will ${bold.italic.redBright(stats.playerplan)}. And monster ${statsToString(stats.monster)} plans to ${bold.italic.blueBright(stats.monsterplan)}
    `),
  offerCookies: (cookies, count) => askKey(handleCookies(cookies), `Chose a cookie to eat. You have ${bold(count)} cookies left!`),
  moveResult: ({ message: { monster, player } }) => {
    const [[name, desc]] = monster;
    const [[nameP, descP]] = player || [[]];
    return ask(`Monster used ${redBright(name)} and ${bold(desc)}.${player ? ` You used ${red(nameP)} and ${bold(descP)}` : ''}`);
  },
  passed: art => ask(bold(`You have completed the stage and got ${art}`)),
  dead: () => ask(bold.red('YOU DIED!')),
  congrats: name => ask(bold.green(`Thank you, ${blueBright(name)}! You have cleared this cursed place! ${grey('For now..')}`)),
};
