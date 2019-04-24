import Base, { prettifyValue, pickRndValueFromArray } from './fighter-base';

export default class Monster extends Base {
  constructor(params, spells, multiplier) {
    super();
    const [name, hp, attack, defValue, resistance] = params;
    this.name = name;
    this.hp = prettifyValue(hp * multiplier);
    this.attack = attack;
    this.defense = 0;
    this.defValue = prettifyValue(defValue * multiplier);
    this.resistance = prettifyValue(resistance + (-1 + multiplier < 0 ? 0 : -1 + multiplier));
    this.spells = spells;
    this.boost = [];
    this.plans = {
      attack: {
        rarity: 1,
        getModifier: (res, def) => {
          const value = this.calcAttack(res, def);
          return [['Attack', `Deals [${value}] damage to player`], [['break', 'player', 'hp', -value]]];
        },
        toString: res => `deal [${this.calcAttack(res)}] DMG`,
      },
      defense: {
        rarity: 1,
        getModifier: () => [['Block', `Defended with [${this.defValue}]`], [['boost', 'monster', 'defense', this.defValue]]],
        toString: () => `defend [${this.defValue}]`,
      },
      'cast a spell': {
        rarity: 1,
        getModifier: () => this.getSpell(),
        toString: () => 'cast a spell',
      },
    };
  }

  setPlan() {
    const rarity = Math.random();
    const plans = Object.keys(this.plans);

    const setRecursively = () => {
      const plan = pickRndValueFromArray(plans);
      const planRarity = this.plans[plan].rarity;
      if (planRarity > rarity) {
        this.plan = plan;
        return;
      }
      setRecursively();
    };
    setRecursively();
  }

  getSpell() {
    return pickRndValueFromArray(this.spells);
  }
}
