export default class Player {
  constructor({ name, cookiesContainer, difficulty }) {
    this.name = name;
    this.hp = Number((50 / difficulty.multiplier).toFixed(2));
    this.defense = 0;
    this.resistance = 0;
    this.attack = 0;
    this.cookiesPerMove = difficulty.activeCookies;
    this.cookiesContainer = cookiesContainer;
    this.difficulty = difficulty;
    this.currentlevel = 1;

    this.artefacts = [];
    this.plan = 'attack';
    this.plans = {
      attack: {
        rarity: 1,
        getModifier: (res, def) => {
          const value = this.calcAttack(res, def);
          return [['Attack', `Deals ${value} damage to monster`], [['break', 'monster', 'hp', -value]]];
        },
        toString: res => `deal [${this.calcAttack(res)}] DMG`,
      },
    };
  }

  getPlan(res) {
    return this.plans[this.plan].toString(res);
  }

  getFinalModifier(res, def) {
    return this.plans[this.plan].getModifier(res, def);
  }

  calcAttack(res, def = 0) {
    const value = this.attack * (1 - res) - def;
    return value < 0 ? 0 : Number(value.toFixed(2));
  }

  getCookies() {
    return [...new Array(5)]
      .map(() => this.cookiesContainer[Math.floor(Math.random() * this.cookiesContainer.length)]);
  }

  getModifiers() {
    return this.artefacts;
  }

  getStats() {
    return {
      hp: this.hp,
      def: this.defense,
      res: this.resistance,
      attack: this.attack,
    };
  }

  processStagePassed() {
    this.reset('patch');
    this.currentlevel += 1;
    this.difficulty.multiplier += 0.1;
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
