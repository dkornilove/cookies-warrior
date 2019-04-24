export default class Monster {
  constructor(params, spells, multiplier) {
    const [name, hp, attack, defValue, resistance] = params;
    this.name = name;
    this.hp = Number((hp * multiplier).toFixed(2));
    this.attack = attack;
    this.defense = 0;
    this.defValue = Number((defValue * multiplier).toFixed(2));
    this.resistance = Number((resistance + (-1 + multiplier < 0 ? 0 : -1 + multiplier)).toFixed(2));
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
        rarity: 0.4,
        getModifier: () => [['Block', `Defended with [${this.defValue}]`], [['boost', 'monster', 'defense', this.defValue]]],
        toString: () => `defend [${this.defValue}]`,
      },
      'cast a spell': {
        rarity: 0.4,
        getModifier: () => this.getSpell(),
        toString: () => 'cast a spell',
      },
    };
  }

  calcAttack(res, def = 0) {
    const value = this.attack * (1 - res) - def;
    return value < 0 ? 0 : Number(value.toFixed(2));
  }

  getStats() {
    return {
      hp: this.hp,
      def: this.defense,
      res: this.resistance,
      attack: this.attack,
    };
  }

  getFinalModifier(res, def) {
    return this.plans[this.plan].getModifier(res, def);
  }

  getPlan(res) {
    return this.plans[this.plan].toString(res);
  }

  setPlan() {
    const rarity = Math.random();
    const plans = Object.keys(this.plans);

    const setRecursively = () => {
      const plan = plans[Math.floor(Math.random() * plans.length)];
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
    return this.spells[Math.floor(Math.random() * this.spells.length)];
  }

  flash(method, attribute, value) {
    if (!this[method]) {
      this[method] = [];
    }
    this[attribute] += value;
    this[method].push([attribute, -value]);
  }

  reset(method) {
    this[method].forEach(([attribute, value]) => {
      this[attribute] += value;
    });
    this[method] = [];
  }
}
