// name, target, attribute, value, rarity
const cookies = [
  ['Sugar cookie', 'player', 'attack', +3, 1],
  ['Chocolate cookie', 'player', 'defense', +5, 1],
  ['Honey cookie', 'monster', 'defense', -5, 1],
  ['Sugar Milk cookie', 'env', 'attack', +1, 0.9],
];

// name, hp, defense, resistance, rarity
const monsters = [
  ['Ugly Fish', 20, 0, 0, 1],
  ['Pretty Demon', 25, 0, 0.1, 1],
];

// name, target, attribute, value, rarity
const spells = [
  ['Knock out the weapon', 'player', 'attack', 0, 1],
  ['No harm', 'monster', 'defense', +10, 1],
];

// name, target, attribute, value, rarity
const environments = [
  ['Plane'],
];

const artefacts = [
  ['Stick of the truth', 'player', 'attack', +1],
  ['Belt of the giant strength', 'player', 'defence', +1],
];

export default {
  cookies,
  monsters,
  spells,
  environments,
  artefacts,
};
