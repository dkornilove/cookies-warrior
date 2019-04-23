export default class Monster {
  constructor(params, spells, multiplier) {
    const [name, hp, attack, defValue, resistance] = params;
    this.name = name;
    this.hp = hp * multiplier;
    this.attack = attack;
    this.defense = 0;
    this.defValue = defValue * multiplier;
    this.resistance = resistance + (-1 + multiplier < 0 ? 0 : -1 + multiplier);
    this.spells = spells;
    this.boost = [];
    this.plans = {
      attack: {
        rarity: 1,
        getModifier: (res, def) => ['Attack', 'break', 'player', 'hp', this.calcAttack(res, def)],
        toString: res => `deal [${this.calcAttack(res)}] DMG`,
      },
      defense: {
        rarity: 0.3,
        getModifier: () => ['Block', 'boost', 'monster', 'defense', this.defValue],
        toString: () => `defend [${this.defValue}]`,
      },
      'cast a spell': {
        rarity: 0.2,
        getModifier: () => this.getSpell(),
        toString: () => 'cast a spell',
      },
    };
  }

  calcAttack(res, def = 0) {
    const value = this.attack * (1 - res) - def;
    return value < 0 ? 0 : value.toFixed(2);
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

  apply(method, attribute, value) {
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
