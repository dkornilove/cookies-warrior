export default class Monster {
  constructor(params, spells, multiplier) {
    const [name, hp, resistance] = params;
    this.name = name;
    this.hp = hp * multiplier;
    this.resistance = resistance + (-1 + multiplier < 0 ? 0 : -1 + multiplier);
    this.spells = spells;
    this.plans = {
      attack: 1, // rarity
      defense: 0.5,
      castSpell: 0.2,
    };
  }
}
