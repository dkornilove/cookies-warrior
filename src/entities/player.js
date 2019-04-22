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
    this.artefacts = [];
    this.difficulty = difficulty;
    this.currentlevel = 1;
    this.score = 0;
    // eslint-disable-next-line no-underscore-dangle
    this._fsm();
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
}

StateMachine.factory(Player, {
  init: 'init',
  transitions: [
    { name: 'patch', from: ['init', 'patched'], to: 'patched' },
    { name: 'boost', from: 'patched', to: 'boosted' },
    { name: 'normalize', from: 'boosted', to: 'patched' },
    { name: 'reset', from: 'patched', to: 'init' },
  ],
  methods: {
    onPatch: ({ fsm: player }, { player: modifiers }) => {},
    onBust: () => {},
    onNormalize: () => {},
    onReset: () => {},
  },
});
