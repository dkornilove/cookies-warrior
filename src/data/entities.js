// name, target, attribute, value, rarity
const cookies = [
  [['Sugar cookie', '+3 damage until end of turn'], [['patch', 'player', 'attack', +3], ['patch', 'player', 'defense', +3]], 1],
  ['Chocolate cookie', '+5 defense until end of turn', 'player', 'defense', +5, 1],
  ['Honey cookie', '-5 defense to monster until end of turn', 'monster', 'defense', -5, 1],
  ['Sugar Milk cookie', 'env', 'attack', +1, 0.9],
];

// name, hp, attack. defenseValue, resistance, rarity
const monsters = [
  ['Ugly Fish', 20, 5, 5, 0, 1],
  ['Pretty Demon', 25, 6, 6, 0.1, 1],
];

// name, target, attribute, value, rarity
const spells = [
  ['Knock out the weapon', 'player', 'attack', 0, 1],
  ['No harm', 'monster', 'defense', +10, 1],
];

// name, target, attribute, value, rarity
const environments = [
  [['Plane', 'Cold -1 attack'], [['patch', 'player', 'attack', -1]], 1],
];

const artefacts = [
  ['Stick of the truth', 'player', 'attack', +1, 1],
  ['Belt of the giant strength', 'player', 'defence', +1, 1],
];

export default {
  cookies,
  monsters,
  spells,
  environments,
  artefacts,
};
