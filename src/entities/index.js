import _ from 'lodash';
import entities from '../data/entities';
import Player from './player';
import Monster from './monster';
import Stage from './stage';

const pickRandomEntity = (repository) => {
  const initRarity = Math.random();
  const data = entities[repository];
  let entity;
  const pickRecursively = () => {
    entity = data[Math.floor(Math.random() * data.length)];
    if (entity.rarity > initRarity) {
      return entity;
    }
    return pickRecursively();
  };
  return pickRecursively();
};

const createContainer = (repo, count) => {
  const container = [];
  for (let i = 0; i < count; i += 1) {
    const modifier = pickRandomEntity(repo);
    container.push(modifier);
  }
  return container;
};

const createPlayer = ({ name, difficulty }) => {
  const cookiesContainer = createContainer('cookies', difficulty.cookiesCount);
  return new Player({ name, difficulty, cookiesContainer });
};

const createMonster = (difficulty) => {
  const params = pickRandomEntity('monsters');
  const spells = createContainer('spells', 5);
  return new Monster(params, spells, difficulty.multiplier);
};

const createArtefact = (player) => {
  const artefact = pickRandomEntity('artefacts');
  player.artefacts.push(artefact);
  return artefact;
};

const createStage = (player) => {
  const monster = createMonster(player.difficulty);
  return new Stage(player, monster, pickRandomEntity('environments'));
};

export default {
  createArtefact,
  createPlayer,
  createStage,
};
