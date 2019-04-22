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
  startStage: stage => ask(`You come to ${stage.name} and fase ${stage.monster.name}`),
  moveInfo: stats => ask(`You ${stats.player} are going to deal ${stats.plrdmg} damage
         to monster ${stats.monster} that plans to ${stats.monsterplan}`),
  offerCookies: () => {},
};
