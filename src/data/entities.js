// [[name, description], [[method, target, attribute, value],[...]], rarity]
const cookies = [
  [['Sugar cookie', '+3 attack until end of turn'], [['boost', 'player', 'attack', +3]], 1],
  [['Milk cookie', '+3 defense until end of turn'], [['boost', 'player', 'defense', +3]], 1],
  [['Chocolate cookie', '+3 attack, +1 defense until end of turn'], [['boost', 'player', 'attack', +3], ['boost', 'player', 'defense', +1]], 0.7],
  [['Honey cookie', '+5 attack until end of turn'], [['boost', 'player', 'attack', +5]], 0.4],
  [['Void cookie', '+2 attack until end of fight'], [['patch', 'player', 'attack', +2]], 0.6],
  [['Lime cookie', '-3 monster attack until end of turn'], [['boost', 'monster', 'attack', -3]], 0.6],
  [['Сracker', '+5 attack, +5 defense until end of turn'], [['boost', 'player', 'attack', +5], ['boost', 'player', 'defense', +5]], 0.3],
  [['Biscuit', '+0.3 resistance until end of turn'], [['boost', 'player', 'resistance', +0.3]], 0.4],
  [['Bourbon biscuit', '-1 attack, -1 defense, -0.1 resistance monster until end of fight'], [['patch', 'monster', 'attack', -1], ['patch', 'monster', 'defense', -1], ['patch', 'monster', 'resistance', -0.1]], 0.3],
  [['Fortune cookie', '+1 attack until end of fight'], [['patch', 'player', 'attack', +1]], 0.4],
  [['Cream cracker', '-2 attack monster until end of fight'], [['patch', 'monster', 'attack', -2]], 0.4],
  [['Oreo', '+8 attack until end of turn'], [['boost', 'player', 'attack', +8]], 0.2],
  [['Rosette', '+1 attack, +1 defense, +0.1 resistance until end of fight'], [['patch', 'player', 'attack', +1], ['patch', 'player', 'defense', +1], ['patch', 'player', 'resistance', +0.1]], 0.4],
  [['Gingerbread man', '-3 hp monster'], [['break', 'monster', 'hp', -3]], 0.3],
  [['Digestive biscuit', '+3 hp'], [['break', 'player', 'hp', +3]], 0.3],
  [['Charcoal biscuit', '+3 hp, -3 hp monster'], [['break', 'monster', 'hp', -3], ['break', 'player', 'hp', +3]], 0.2],
  [['Carrot cookie', '+1 cookie until end of fight'], [['patch', 'player', 'cookiesPerMove', +1], ['patch', 'player', 'getcookies', +1]], 0.3],
  [['Butter cookie', '+5 attack, -1 cookie until end of fight'], [['patch', 'player', 'cookiesPerMove', -1], ['patch', 'player', 'getcookies', -1], ['patch', 'player', 'attack', +5]], 0.3],

];

// [name, hp, attack. defenseValue, resistance, rarity]
const monsters = [
  ['Dummy', 10, 6, 5, 0, 1],
  ['Pretty Demon', 11, 7, 6, 0, 1],
  ['Snowman John', 13, 5, 7, 0, 1],
  ['Ugly Fish', 14, 4, 8, 0, 1],
  ['Red Eye', 11, 8, 4, 0, 1],
  ['Crazy Octupus', 14, 5, 7, 0, 1],
  ['Horde Leader', 14, 4, 6, 0, 1],
  ['Strange Entity', 11, 7, 5, 0, 1],
  ['Old Woman', 12, 6, 8, 0, 1],
  ['Old Man', 15, 6, 8, 0, 0.9],
  ['Legion Commander', 16, 7, 9, 0.06, 0.9],
  ['Warlock', 17, 8, 8, 0.07, 0.8],
  ['Gremlin', 18, 9, 9, 0.08, 0.8],
  ['Cursed Hippo', 19, 10, 10, 0.1, 0.7],
  ['Aggresive Chicken', 20, 11, 12, 0.11, 0.6],
  ['Young Dragon', 21, 12, 11, 0.12, 0.5],
  ['Cthulhu', 22, 13, 12, 0.13, 0.4],

];

// [[name, description], [[method, target, attribute, value],[...]], rarity]
const spells = [
  [['Knock out the weapon', '-10 player attack until end of turn'], [['boost', 'player', 'attack', -10]], 1],
  [['Snow defense', '+2 monster defense until end of fight'], [['patch', 'monster', 'defense', +2]], 1],
  [['Fury', '+2 monster attack until end of fight'], [['patch', 'monster', 'attack', +2]], 1],
  [['Nature`s Call', '+0.1 monster resistance until end of fight'], [['patch', 'monster', 'resistance', +0.1]], 1],
  [['Old Curse', '-2 player attack until end of fight'], [['patch', 'player', 'attack', -2]], 1],
  [['Plague', '-0.2 player resistance until end of fight'], [['patch', 'player', 'resistance', -0.2]], 1],
  [['Unholy Strange', '+4 monster attack until end of fight'], [['patch', 'monster', 'attack', +5]], 0.8],
  [['Steal Cookie', '-1 player cookie until end of fight'], [['patch', 'player', 'cookiesPerMove', -1], ['patch', 'player', 'getcookies', -1]], 0.8],

];

// [[name, description], [[method, target, attribute, value],[...]], rarity]
const environments = [
  [['Yellow Plane', 'Cold: -1 attack player'], [['patch', 'player', 'attack', -1]], 1],
  [['Blue Swamp', 'Warm: +1 attack monster, +1 attack player'], [['patch', 'monster', 'attack', +1], ['patch', 'player', 'attack', +1]], 1],
  [['Mountains', 'Fear: -1 cookie'], [['patch', 'player', 'cookiesPerMove', -1], ['patch', 'player', 'getcookies', -1]], 0.8],
  [['Magic Forest', 'Joy: +1 defense player'], [['patch', 'player', 'defense', +1]], 1],
  [['Abandoned Village', 'Sadness: +0.1 resistance monster'], [['patch', 'monster', 'resistance', +0.1]], 1],
  [['Deep Cave', 'Dark: +2 attack monster, +0.1 resistance player'], [['patch', 'monster', 'attack', +2], ['patch', 'player', 'resistance', +0.1]], 1],
  [['Quagmire', 'Stickiness: +1 player defense'], [['patch', 'player', 'deffense', +1]], 1],
  [['Green Steppe', 'Freedom: +1 cookie'], [['patch', 'player', 'cookiesPerMove', +1], ['patch', 'player', 'getcookies', +1]], 0.7],
  [['Cemetery', 'Panic: -0.1 resistance player, -1 attack player'], [['patch', 'player', 'resistance', -0.1], ['patch', 'player', 'attack', -1]], 1],
  [['Derelict Camp', 'Sadness: +0.1 resistance monster'], [['patch', 'monster', 'resistance', +0.1]], 1],
  [['Lawn with a Fire', 'Warm: +1 attack monster, +1 attack player'], [['patch', 'monster', 'attack', +1], ['patch', 'player', 'attack', +1]], 1],
  [['Smelly Lane', 'Disgust: -1 attack player, +1 defense monster'], [['patch', 'monster', 'defense', +1], ['patch', 'player', 'attack', -1]], 1],

];

// [[name, description], [[method, target, attribute, value],[...]], rarity]
const artefacts = [
  [['Stick of the truth', '+1 player attack'], [['patch', 'player', 'attack', +1]], 1],
  [['Ogre Belt', '+1 player defense'], [['patch', 'player', 'defense', +1]], 1],
  [['Horseshoe', '+1 cookie'], [['patch', 'player', 'cookiesPerMove', +1], ['patch', 'player', 'getcookies', +1]], 0.7],
  [['Staff of Humiliation', '-0.1 monster resistance'], [['patch', 'monster', 'resistance', -0.1]], 1],
  [['Sword of Justice', '+1 player attack, -0.1 monster resistance'], [['patch', 'player', 'attack', +1], ['patch', 'monster', 'resistance', -0.1]], 0.95],
  [['Rusty Blade', '-1 monster attack'], [['patch', 'monster', 'attack', -1]], 1],
  [['Worn Shield', '+1 player defense, +0.1 player resistance'], [['patch', 'player', 'defense', +1], ['patch', 'player', 'resistance', +0.1]], 0.9],
  [['Bottled Poison', '-0.1 monster resitance, -1 monster attack, -1 monster defense'], [['patch', 'monster', 'resistance', -0.1], ['patch', 'monster', 'attack', -1], ['patch', 'monster', 'defense', -1]], 0.7],
  [['Mercy Hat', '+2 player defense'], [['patch', 'player', 'defense', +2]], 1],
  [['InsideOut Shirt', '-0.1 player resistance, +2 player attack'], [['patch', 'player', 'attack', +2], ['patch', 'player', 'resistance', -0.1]], 1],
  [['Mail of Fidelity', '+0.1 player resistance'], [['patch', 'player', 'resitance', +0.1]], 1],
  [['Dragon Eye', '+0.1 player resistance, +1 player attack, +1 player defense'], [['patch', 'player', 'defense', +1], ['patch', 'player', 'attack', +1], ['patch', 'player', 'resitance', +0.1]], 0.8],
  [['Gobelet of Fire', '+1 player attack, +2 player defense'], [['patch', 'player', 'attack', +1], ['patch', 'player', 'defense', +2]], 0.8],

];

export default {
  cookies,
  monsters,
  spells,
  environments,
  artefacts,
};
