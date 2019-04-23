export default class Stage {
  constructor(player, monster, stageMeta) {
    const [[name, description]] = stageMeta;
    this.player = player;
    this.monster = monster;
    this.name = name;
    this.description = description;
    this.stageMeta = stageMeta;
  }

  initialize() {
    this.player.getModifiers().forEach(this.applyModifier);
    this.applyModifier(this.stageMeta);
    this.monster.setPlan();
    return this.getStats();
  }

  processMove() {
    const result = {};
    const { res, def } = this.player.getStats();
    const monsterEndMove = this.monster.getFinalModifier(res, def);
    this.applyModifier(monsterEndMove);
    if (this.player.hp > 0) {
      const { res: mRes, def: mDef } = this.player.getStats();
      const playerEndMove = this.player.getFinalModifier(mRes, mDef);
      this.applyModifier(playerEndMove);
      result.status = this.monster.hp > 0 ? 'not-finished' : 'passed';
    } else {
      result.status = 'dead';
    }

    result.message = 'something happen'; // TODO
    this.player.reset('boost');
    this.monster.reset('boost');
    this.monster.setPlan();
    if (result.status === 'passed') {
      this.player.reset('patch');
    }

    return result;
  }

  getCookies(index) {
    const memo = {};
    if (!memo.offer || !index) {
      memo.offer = this.player.getCookies();
      memo.available = this.player.cookiesPerMove;
    } else {
      memo.offer.splice(index, 1);
      memo.available -= 1;
    }
    return memo;
  }

  applyModifier(modifier) {
    const [/* [name, description] */, settings] = modifier;
    settings.forEach(
      ([method, target, attribute, value]) => this[target].apply(method, attribute, value),
    );
  }

  getStats() {
    const createStatsString = (...stats) => stats.map(s => `[HP:${s.hp} DEF:${s.def}] RES:${s.res}`);
    const playerStats = this.player.getStats();
    const monsterStats = this.monster.getStats();
    const [player, monster] = createStatsString(playerStats, monsterStats);
    const playerplan = this.player.getPlan(monsterStats.res);
    const monsterplan = this.monster.getPlan(playerStats.res);
    return {
      player,
      playerplan,
      monster,
      monsterplan,
    };
  }
}
