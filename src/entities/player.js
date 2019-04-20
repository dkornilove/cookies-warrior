export default class Player {
  constructor(params) {
    const {
      name, cookiesContainer, difficulty,
    } = params;
    this.name = name;
    this.hp = 100 / difficulty.multiplier;
    this.defense = 0;
    this.resistance = 0;
    this.basicAttack = 10 / difficulty.multiplier;
    this.nextAttack = this.basicAttack;
    this.cookiesPerMove = difficulty.cookies;
    this.cookiesContainer = cookiesContainer;
    this.artefacts = [];
    this.difficulty = difficulty;
    this.currentlevel = 1;
    this.score = 0;
  }
}
