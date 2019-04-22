export default class Stage {
  constructor(player, monster, env) {
    this.player = player;
    this.monster = monster;
    this.env = env;
    this.modifiers = {
      player: [],
      monster: [],
    };
    this.boosters = {
      player: [],
      monster: [],
    };
  }

  getCookies(index) {
    let memo;
    if (!memo) {
      memo = this.player.getCookies();
    } else {
      // extract from memo
    }
    return memo;
  }

  applyModifier(modifier) {

  }

  getStats() {
    const createStatsString = (...stats) => stats.map(s => `[HP:${s.hp} DEF:${s.def}] RES:${s.res}`);
    const playerStats = this.player.getStats();
    const monsterStats = this.monster.getStats();
    const plrDmg = playerStats.attack * (1 - monsterStats.res);
    const mnstrDmg = monsterStats.attack * (1 - playerStats.res);
    const [player, monster] = createStatsString(playerStats, monsterStats);
    return {
      player,
      plrDmg,
      monster,
      monsterplan: this.monster.getPlan(mnstrDmg),
    };
  }

  // ['player', 'attribute', 'value']
  sortModifier(modifier) {
    const [target, ...rest] = modifier;
    this.modifiers[target].push(rest);
  }

  initialize() {
    this.player.getModifiers().forEach(this.sortModifier);
    this.player.patch(this.modifiers);
    this.monster.patch(this.modifiers);
    return this.getStats();
  }

  patch(modifier) {

  }

  boost(modifier) {

  }
}
