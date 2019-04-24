import readline from 'readline-sync';
import chalk from 'chalk';

const ask = readline.question;
const askKey = readline.keyInSelect;
const { log } = console;

export default {
  askName: () => ask(chalk.bold('Greetings, traveler! What is your name? '), { defaultInput: 'Stranger' }),
  greetings: user => ask(`Well, well, ${user}, I hope you like cookies! And monsters.. Slashing monsters!`),
  askForMood: moods => askKey(moods, 'How do you feel yourself today?', {
    cancel: chalk.bgBlue('No more murders today'),
  }),
  bye: name => log(`Well, ${name}, I hope you will come back to clear this cursed place!`),
  preStart: (mood, user) => ask(`Okay, ${mood.toLowerCase()} ${user}, lets find out what are you made of!`),
  startStage: stage => ask(`Stage ${stage.player.currentlevel}/${stage.player.difficulty.levels}.
     You come to ${stage.name} [${stage.description}] and meet ${stage.monster.name}`),
  moveInfo: stats => ask(`On the end of turn:
    You ${stats.player} will ${stats.playerplan}. And monster ${stats.monster} plans to ${stats.monsterplan}`),
  offerCookies: (cookies, count) => askKey(cookies, `Chose a cookie to eat. You have ${count} cookies left!`),
  moveResult: ({ message: { monster, player } }) => {
    const [[name, desc]] = monster;
    const [[nameP, descP]] = player;
    ask(`Monster used '${name}' and ${desc}.${player ? ` You used ${nameP} and ${descP}` : ''}`);
  },
  passed: art => ask(`You have completed the stage and got ${art}`),
  dead: () => ask('YOU DIED!'),
};
