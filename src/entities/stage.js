export default class Stage {
  constructor(player, monster, env) {
    this.player = player;
    this.monster = monster;
    this.env = env;
  }

  initialize() {
    this.player.getModifiers().forEach(this.applyModifier);
    return this.getStats();
  }

  getCookies(index) {
    let memo;
    if (!memo) {
      memo = this.player.getCookies();
    } else {
      memo.splice(index, 1);
    }
    return memo;
  }

  applyModifier(modifier) {
    const [[name, description], settings] = modifier;
    settings.forEach(([method, target, attribute, value]) => this[target][method](attribute, value));
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
}
