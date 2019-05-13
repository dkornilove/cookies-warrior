// [name#meta#rarity, [method#target#attribute#value, ...]]

const cookies = [
  ['Sugar cookie##1', ['boost#player#attack#+3']],
  ['Milk cookie##1', ['boost#player#defense#+3']],
  ['Honey cookie##0.8', ['boost#player#attack#+5']],
  ['Ice cookie##0.8', ['boost#player#defense#+5']],
  ['Chocolate cookie##0.8', ['boost#player#attack#+3, boost#player#defense#+2']],
  ['Charcoal biscuit#Consumable:#0.2', ['break#monster#hp#-3', 'break#player#hp#+3']],
  ['Void cookie#Consumable:#0.4', ['patch#player#attack#+2']],
  ['Creamy cookie#Consumable:#0.4', ['patch#player#defense#+2']],
  ['Lime cookie##0.8', ['boost#monster#attack#-3']],
  ['Сracker##0.2', ['boost#player#attack#+5', 'boost#player#defense#+4']],
  ['Biscuit##0.4', ['boost#player#resistance#0.3']],
  ['Bourbon biscuit#Consumable:#0.4', ['patch#monster#attack#-1', 'patch#monster#defense#-1', 'patch#monster#resistance#-0.1']],
  ['Fortune cookie##1', ['patch#player#attack#+1']],
  ['Cream cracker##1', ['patch#monster#attack#-1']],
  ['Oreo#Consumable:#0.2', ['boost#player#attack#+8']],
  ['Choco-Pie#Consumable:#0.2', ['boost#player#defense#+8']],
  ['Rosette#Consumable:#0.4', ['patch#player#attack#+1', 'patch#player#defense#+1', 'patch#player#resistance#+0.1']],
  ['Gingerbread man##0.8', ['break#monster#hp#-3']],
  ['Digestive biscuit##0.8', ['break#player#hp#+3']],
  ['Carrot cookie#Consumable:#0.4', ['patch#player#cookiesPerMove#+1', 'patch#player#getcookies#+1']],
  ['Butter cookie#Consumable:#0.2', ['patch#player#cookiesPerMove#-1', 'patch#player#getcookies#-1', 'patch#player#attack#+4']],
];

// [name, hp, attack. defenseValue, resistance, rarity]
const monsters = [
  ['Creepy Dog', 10, 6, 5, 0, 1],
  ['Pretty Demon', 11, 7, 6, 0, 1],
  ['Snowman John', 13, 5, 7, 0, 1],
  ['Ugly Fish', 14, 4, 8, 0, 1],
  ['Red Eye', 11, 8, 4, 0, 1],
  ['Crazy Octupus', 14, 5, 7, 0, 1],
  ['Horde Leader', 14, 4, 6, 0, 1],
  ['Strange Entity', 11, 7, 5, 0, 1],
  ['Walking dead', 12, 6, 8, 0, 1],
  ['DeathEater', 15, 6, 8, 0, 0.9],
  ['Legion Commander', 16, 7, 9, 0.06, 0.9],
  ['Warlock', 17, 8, 8, 0.07, 0.8],
  ['Gremlin', 18, 9, 9, 0.08, 0.8],
  ['Cursed Hippo', 19, 10, 10, 0.1, 0.7],
  ['Aggresive Chicken', 20, 11, 12, 0.11, 0.6],
  ['Young Dragon', 21, 12, 11, 0.12, 0.5],
  ['Cthulhu', 22, 13, 12, 0.13, 0.4],

];

// [name#meta#rarity, [method#target#attribute#value, ...]]
const spells = [
  ['Knock out the weapon##1', ['boost#player#attack#-10']],
  ['Snow defense$##1', ['patch#monster#defense#+2']],
  ['Fury##1', ['patch#monster#attack#+3']],
  ['Nature`s Call##1', ['patch#monster#resistance#+0.1']],
  ['Old Curse##1', ['patch#player#attack#-2']],
  ['Plague##1', ['patch#player#resistance#-0.2']],
  ['Unholy Strange##1', ['patch#monster#attack#+4']],
  ['Steal Cookie##1', ['patch#player#cookiesPerMove#-1', 'patch#player#getcookies#-1']],

];

// [name#meta#rarity, [method#target#attribute#value, ...]]
const environments = [
  ['Yellow Plane#Cold:#1', ['patch#player#attack#-1']],
  ['Blue Swamp#Warm:#0.8', ['patch#monster#attack#+1#patch#player#attack#+1']],
  ['Mountains#Fear:#0.8', ['patch#player#cookiesPerMove#-1', 'patch#player#getcookies#-1']],
  ['Magic Forest#Joy:#1', ['patch#player#defense#+1']],
  ['Abandoned Village#Sadness:#1', ['patch#monster#resistance#+0.1']],
  ['Deep Cave#Dark:#1', ['patch#monster#attack#+2', 'patch#player#resistance#+0.1']],
  ['Quagmire#Stickiness:#1', ['patch#player#deffense#+1']],
  ['Green Steppe#Freedom:#0.4', ['patch#player#cookiesPerMove#+1', 'patch#player#getcookies#+1']],
  ['Cemetery#Panic:#1', ['patch#player#resistance#-0.1', 'patch#player#attack#-1']],
  ['Derelict Camp#Sadness:#1', ['patch#monster#resistance#+0.1']],
  ['Lawn with a Fire#Warm:1', ['patch#monster#attack#+1', 'patch#player#attack#+1']],
  ['Smelly Lane#Disgust:#1', ['patch#monster#defense#+1', 'patch#player#attack#-1']],

];

// [name#meta#rarity, [method#target#attribute#value, ...]]
const artefacts = [
  ['Stick of the truth#Applies at the level start:#1', ['patch#player#attack#+1']],
  ['Ogre Belt#Applies at the level start:#1', ['patch#player#defense#+1']],
  ['Horseshoe#Applies at the level start:#0.8', ['patch#player#cookiesPerMove#+1', 'patch#player#getcookies#+1']],
  ['Staff of Humiliation#Applies at the level start:#1', ['patch#monster#resistance#-0.1']],
  ['Sword of Justice#Applies at the level start:#0.8', ['patch#player#attack#+1', 'patch#monster#resistance#-0.1']],
  ['Rusty Blade#Applies at the level start:#1', ['patch#monster#attack#-1']],
  ['Worn Shield#Applies at the level start:#0.8', ['patch#player#defense#+1', 'patch#player#resistance#+0.1']],
  ['Bottled Poison#Applies at the level start:#0.4', ['patch#monster#resistance#-0.1', 'patch#monster#attack#-1', 'patch#monster#defense#-1']],
  ['Mercy Hat#Applies at the level start:#1', ['patch#player#defense#+2']],
  ['InsideOut Shirt#Applies at the level start:#1', ['patch#player#attack#+2', 'patch#player#resistance#-0.1']],
  ['Mail of Fidelity#Applies at the level start:#1', ['patch#player#resitance#+0.1']],
  ['Dragon Eye#Applies at the level start:#0.8', ['patch#player#defense#+1', 'patch#player#attack#+1', 'patch#player#resitance#+0.1']],
  ['Gobelet of Fire#Applies at the level start:#0.8', ['patch#player#attack#+1', 'patch#player#defense#+2']],

];

const parseModificators = repository => repository.map((e) => {
  const [modSettings, modStrings] = e;
  const [name, meta, rarity] = modSettings.split('#');
  const modificators = modStrings.map(s => s.split('#'))
    .map(([method, target, attribute, value]) => ({
      method, target, attribute, value,
    }));
  return {
    name,
    meta,
    rarity,
    modificators,
  };
});

const parseMonsters = () => monsters.map(([name, hp, attack, defense, resistance, rarity]) => ({
  name, hp, attack, defense, resistance, rarity,
}));

export default {
  cookies: parseModificators(cookies),
  monsters: parseMonsters(),
  spells: parseModificators(spells),
  environments: parseModificators(environments),
  artefacts: parseModificators(artefacts),
};
