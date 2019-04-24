// name, target, attribute, value, rarity
const cookies = [
  [['Sugar cookie', '+3 dmg until end of turn'], [['boost', 'player', 'attack', +3]], 1],
  [['Milk cookie', '+3 def until end of turn'], [['boost', 'player', 'defense', +3]], 1],
  [['Choco cookie', '+3 dmg, +1 def until end of turn'], [['boost', 'player', 'attack', +3], ['boost', 'player', 'defense', +1]], 0.7],
  [['Honey cookie', '+5 dmg until end of turn'], [['boost', 'player', 'attack', +5]], 0.6],
  [['Void cookie', '+2 dmg until end of fight'], [['patch', 'player', 'attack', +2]], 0.6],
];

// name, hp, attack. defenseValue, resistance, rarity
const monsters = [
  ['Ugly Fish', 10, 6, 5, 0, 1],
  ['Pretty Demon', 11, 7, 6, 0, 0.95],
  ['Snowman Jhon', 12, 6, 7, 0, 0.9],
];

// name, target, attribute, value, rarity
const spells = [
  [['Knock out the weapon', 'Decrease player attack for [10] until end of turn'], [['boost', 'player', 'attack', -10]], 1],
  [['Snow defense', ''], [['patch', 'monster', 'defense', +2]], 1],
  [['Fury', ''], [['patch', 'monster', 'attack', +2]], 1],
];

// name, target, attribute, value, rarity
const environments = [
  [['Plane', 'Cold -1 attack'], [['patch', 'player', 'attack', -0.1]], 1],
  [['Mountains', 'Warm +1 attack monster'], [['patch', 'monster', 'attack', +1]], 1],

];

const artefacts = [
  [['Stick of the truth', ''], [['patch', 'player', 'attack', +1]], 1],
  [['Belt of the giant strength', ''], [['patch', 'player', 'defense', +1]], 1],
];

export default {
  cookies,
  monsters,
  spells,
  environments,
  artefacts,
};
