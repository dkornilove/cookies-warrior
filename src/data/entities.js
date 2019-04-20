// name, target, attribute, value, rarity
export const cookies = [
  ['Sugar cookie', 'player', 'nextAttack', +3, 1],
  ['Chocolate cookie', 'player', 'defense', +5, 1],
  ['Honey cookie', 'monster', 'defense', -5, 1],
  ['Sugar Milk cookie', 'env', 'attack', +1, 0.9],
];

// name, hp, defense, resistance, rarity
export const monsters = [
  ['Ugly Fish', 20, 0, 0, 1],
  ['Pretty Demon', 25, 0, 0.1, 1],
];

// name, target, attribute, value, rarity
export const spells = [
  ['Knock out the weapon', 'player', 'nextAttack', 0, 1],
  ['No harm', 'monster', 'defense', +10, 1],
];

// name, target, attribute, value, rarity
export const stages = [
  ['Plane', '', '', '', 1],
];

export const artefacts = [
  ['Stick of the truth', 'env', 'attack', +1],
  ['Belt of the giant strength', 'env', 'defence', +1],
];
