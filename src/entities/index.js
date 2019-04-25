import _ from 'lodash';
import entities from '../data/entities';
import Player from './player';
import Monster from './monster';
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

const createModifier = repository => _.initial(pickRandomEntity(repository));

const createCookiesContainer = (count) => {
  const cookiesContainer = [];
  for (let i = 0; i < count; i += 1) {
    const newCookie = createModifier('cookies');
    cookiesContainer.push(newCookie);
  }
  return cookiesContainer;
};

const createPlayer = ({ name, difficulty }) => {
  const cookiesContainer = createCookiesContainer(difficulty.cookiesCount);
  return new Player({ name, difficulty, cookiesContainer });
};

const createSpellContainer = () => {
  const spellContainer = [];
  for (let i = 0; i < 3; i += 1) {
    const newSpell = createModifier('spells');
    spellContainer.push(newSpell);
  }
  return spellContainer;
};

const createMonster = (difficulty) => {
  const params = pickRandomEntity('monsters');
  const spells = createSpellContainer();
  return new Monster(params, spells, difficulty.multiplier);
};

const createArtefact = (player) => {
  const artefact = pickRandomEntity('artefacts');
  player.artefacts.push(artefact);
  return artefact;
};

const createStage = (player) => {
  const monster = createMonster(player.difficulty);
  return new Stage(player, monster, createModifier('environments'));
};

export default {
  createArtefact,
  createPlayer,
  createStage,
};
