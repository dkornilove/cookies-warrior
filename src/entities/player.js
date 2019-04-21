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
}

StateMachine.factory(Player, {
  init: 'init',
  transitions: [
    { name: 'equip', from: 'init', to: 'equipped' },
    { name: 'patch', from: ['equipped', 'patched'], to: 'patched' },
    { name: 'bust', from: 'patched', to: 'busted' },
    { name: 'normalize', from: 'busted', to: 'patched' },
    { name: 'reset', from: 'patched', to: 'init' },
  ],
  methods: {
    onEquip: () => {},
    onPatch: () => {},
    onBust: () => {},
    onReset: () => {},
    onNormalize: () => {},
  },
});
