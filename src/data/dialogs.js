import readline from 'readline-sync';
import chalk from 'chalk';

const ask = readline.question;
const askKey = readline.keyInSelect;
const { log } = console;
const {
  bold, italic, red, blueBright, greenBright, redBright, bgYellowBright,
} = chalk;
const handleCookies = cookies => cookies.map(([name, desc]) => `${bgYellowBright.black(name)} [${italic(desc)}]`);
const statsToString = stats => `${red.bold('\u2665')}${bold(stats.hp)} ${chalk.blue.bold('\u2666')}${bold(stats.def)} ${greenBright.bold('\u2699')}${bold(stats.res)}`;

export default {
  askName: () => ask('Greetings, traveler! What is your name?', { defaultInput: 'Stranger' }),
  greetings: user => ask(`Well, well, ${blueBright(user)}, I hope you love cookies! And monsters.. ${bold('Slashing monsters!')}`),
  askForMood: moods => askKey(moods, 'How do you feel yourself today?', {
    cancel: 'No more murders today',
  }),
  bye: name => log(`Well, ${blueBright(name)}, I hope you will come back to clear this cursed place!`),
  preStart: (mood, user) => ask(`Okay, ${italic(mood.toLowerCase())} ${blueBright(user)}, lets find out what are you made of!`),
  startStage: stage => ask(`Stage ${stage.player.currentlevel}/${stage.player.difficulty.levels}.
     You come to ${greenBright(stage.name)} [${italic(stage.description)}] and meet ${redBright(stage.monster.name)}`),
  moveInfo: stats => ask(`On the end of turn:
    You ${statsToString(stats.player)} will ${stats.playerplan}. And monster ${statsToString(stats.monster)} plans to ${stats.monsterplan}`),
  offerCookies: (cookies, count) => askKey(handleCookies(cookies), `Chose a cookie to eat. You have ${count} cookies left!`),
  moveResult: ({ message: { monster, player } }) => {
    const [[name, desc]] = monster;
    const [[nameP, descP]] = player;
    ask(`Monster used '${name}' and ${desc}.${player ? ` You used ${nameP} and ${descP}` : ''}`);
  },
  passed: art => ask(`You have completed the stage and got ${art}`),
  dead: () => ask('YOU DIED!'),
};
