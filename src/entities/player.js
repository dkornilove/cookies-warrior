import Base, { prettifyValue, pickRndValueFromArray } from './fighter-base';

export default class Player extends Base {
  constructor({ name, cookiesContainer, difficulty }) {
    super();
    this.name = name;
    this.hp = prettifyValue(50 / difficulty.multiplier);
    this.defense = 0;
    this.resistance = 0;
    this.attack = 0;
    this.cookiesPerMove = difficulty.activeCookies;
    this.cookiesContainer = cookiesContainer;
    this.difficulty = difficulty;
    this.currentlevel = 1;
    this.getcookies = this.cookiesPerMove + 3;
    this.artefacts = [];
    this.plan = 'attack';
    this.boost = [];
    this.patch = [];
    this.plans = {
      attack: {
        rarity: 1,
        getModifier: (res, def) => {
          const value = this.calcAttack(res, def);
          return {
            name: 'Attack',
            modificators: [['break', 'monster', 'hp', -value]],
          };
        },
        toString: res => `deal [${this.calcAttack(res)}] DMG`,
      },
    };
  }

  getCookies() {
    return [...new Array(this.getcookies < 0 ? 0 : this.getcookies)]
      .map(() => pickRndValueFromArray(this.cookiesContainer));
  }

  getModifiers() {
    return this.artefacts;
  }

  processStagePassed() {
    this.reset('patch');
    this.currentlevel += 1;
    this.difficulty.multiplier += 0.1;
    return this.currentlevel <= this.difficulty.levels;
  }
}
