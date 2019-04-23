import StateMachine from 'javascript-state-machine';

export default class Player {
  constructor({ name, cookiesContainer, difficulty }) {
    this.name = name;
    this.hp = 100 / difficulty.multiplier;
    this.defense = 0;
    this.resistance = 0;
    this.attack = 0;
    this.cookiesPerMove = difficulty.cookies;
    this.cookiesContainer = cookiesContainer;
    this.difficulty = difficulty;
    this.currentlevel = 1;

    this.artefacts = [];
    this.patch = [];
    this.boost = [];
  }

  getCookies() {
    return [...new Array(this.cookiesPerMove)]
      .map(() => this.cookiesContainer[Math.floor(Math.random() * this.cookiesContainer.length)]);
  }

  getModifiers() {
    return this.artefacts.map(([, ...modifier]) => modifier);
  }

  getStats() {
    return {
      hp: this.hp,
      def: this.defense,
      res: this.resistance,
      attack: this.attack,
    };
  }

  apply(method, attribute, value) {
    this[attribute] += value;
    this[method].push([[attribute, -value]]);
  }

  reset(method) {
    this[method].forEach(([attribute, value]) => {
      this[attribute] += value;
    });
    this[method] = [];
  }
}
