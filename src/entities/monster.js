import Base, { prettifyValue, pickRndValueFromArray } from './fighter-base';

export default class Monster extends Base {
  constructor(params, spells, multiplier) {
    super();
    this.name = params.name;
    this.hp = prettifyValue(params.hp * multiplier);
    this.attack = params.attack;
    this.defense = 0;
    this.defValue = prettifyValue(params.defense * multiplier);
    this.resistance = prettifyValue(
      params.resistance + (-1 + multiplier / 2 < 0 ? 0 : -1 + multiplier / 2),
    );
    this.spells = spells;
    this.boost = [];
    this.plans = {
      attack: {
        rarity: 1,
        getModifier: (res, def) => {
          const value = this.calcAttack(res, def);
          return {
            name: 'Attack',
            meta: '',
            modificators: [
              {
                method: 'break',
                target: 'player',
                attribute: 'hp',
                value: -value,
              },
            ],
          };
        },
        toString: res => `deal [${this.calcAttack(res)}] DMG`,
      },
      defense: {
        rarity: 0.5,
        getModifier: () => ({
          name: 'Block',
          meta: '',
          modificators: [
            {
              method: 'boost',
              target: 'monster',
              attribute: 'defense',
              value: this.defValue,
            },
          ],
        }),
        toString: () => `defend with [+${this.defValue}]`,
      },
      'cast a spell': {
        rarity: 0.5,
        getModifier: () => this.getSpell(),
        toString: () => 'cast a spell',
      },
    };
  }

  setPlan() {
    const initRarity = Math.random();
    const plans = Object.keys(this.plans);
    let nextPlan = pickRndValueFromArray(plans);
    while (this.plans[nextPlan].rarity < initRarity) {
      nextPlan = pickRndValueFromArray(plans);
    }
    this.plan = nextPlan;
  }

  getSpell() {
    return pickRndValueFromArray(this.spells);
  }
}
