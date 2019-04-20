export default class Player {
  constructor(params) {
    const {
      name, hp, resistance, basicAttack, cookies, container,
    } = params;
    this.name = name;
    this.hp = hp;
    this.defense = 0;
    this.resistance = resistance;
    this.basicAttack = basicAttack;
    this.nextAttack = basicAttack;
    this.cookiesPerMove = cookies;
    this.cookiesContainer = container;
    this.artefacts = [];
  }
}
