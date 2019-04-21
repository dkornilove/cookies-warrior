import _ from 'lodash';
import entities from '../data/entities';
import Player from './player';
import Cookie from './cookie';
import MonsterSpell from './monster-spell';
import Monster from './monster';
import Environment from './environment';
import Stage from './stage';

const pickRandomEntity = (repository) => {
  const rarity = Math.random();
  const data = entities[repository];
  let item;
  const pickRecursively = () => {
    item = data[Math.floor(Math.random() * data.length)];
    const itemRarity = _.last(item);
    if (itemRarity > rarity) {
      return item;
    }
    return pickRecursively();
  };
  return pickRecursively();
};

export const createCookie = () => {
  const params = pickRandomEntity('cookies');
  const cookie = new Cookie(params);
  return cookie;
};

export const createCookiesContainer = (count) => {
  const cookiesContainer = [];
  for (let i = 0; i < count; i += 1) {
    const newCookie = createCookie();
    cookiesContainer.push(newCookie);
  }
};

export const createPlayer = ({ name, difficulty }) => {
  const cookiesContainer = createCookiesContainer(difficulty.cookiesCount);
  return new Player({ name, difficulty, cookiesContainer });
};

export const createMonsterSpell = () => {
  const params = pickRandomEntity('spells');
  const spell = new MonsterSpell(params);
  return spell;
};

export const createSpellContainer = () => {
  const spellContainer = [];
  for (let i = 0; i < 3; i += 1) {
    const newSpell = createMonsterSpell();
    spellContainer.push(newSpell);
  }
};

export const createMonster = (difficulty) => {
  const params = pickRandomEntity('monsters');
  const spells = createSpellContainer();
  return new Monster(params, spells, difficulty.multiplier);
};

export const createEnvironment = () => {
  const params = pickRandomEntity('environments');
  return new Environment(params);
};

export const createStage = (player) => {
  const monster = createMonster(player.difficulty);
  const env = createEnvironment();
  return new Stage(player, monster, env);
};
