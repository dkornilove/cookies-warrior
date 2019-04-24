export default class Stage {
  constructor(player, monster, stageMeta) {
    const [[name, description]] = stageMeta;
    this.player = player;
    this.monster = monster;
    this.name = name;
    this.description = description;
    this.stageMeta = stageMeta;
    this.cookiesToOffer = {
      offer: null,
      available: player.cookiesPerMove,
    };
  }

  initialize() {
    this.player.getModifiers().forEach(m => this.applyModifier(m));
    this.applyModifier(this.stageMeta);
    this.monster.setPlan();
    return this.getStats();
  }

  processMove() {
    const result = {};
    const { res, def } = this.player.getStats();
    const monsterEndMove = this.monster.getFinalModifier(res, def);
    this.applyModifier(monsterEndMove);
    result.message = {
      monster: monsterEndMove,
    };
    if (this.player.hp > 0) {
      const { res: mRes, def: mDef } = this.monster.getStats();
      const playerEndMove = this.player.getFinalModifier(mRes, mDef);
      this.applyModifier(playerEndMove);
      result.message.player = playerEndMove;
      result.status = this.monster.hp > 0 ? 'not-finished' : 'passed';
    } else {
      result.status = 'dead';
    }
    this.player.reset('boost');
    this.monster.reset('boost');
    this.monster.setPlan();
    if (result.status === 'passed') {
      this.player.processStagePassed();
    }
    return result;
  }

  getCookies(index = null) {
    if (!this.cookiesToOffer.offer || index === null) {
      this.cookiesToOffer.offer = this.player.getCookies();
      this.cookiesToOffer.available = this.player.cookiesPerMove;
    } else {
      this.cookiesToOffer.offer.splice(index, 1);
      this.cookiesToOffer.available -= 1;
    }
    return this.cookiesToOffer;
  }

  applyModifier(modifier) {
    const [/* [name, description] */, settings] = modifier;
    settings.forEach(
      ([method, target, attribute, value]) => this[target].flash(method, attribute, value),
    );
  }

  getStats() {
    const createStatsString = (...stats) => stats.map(s => `[HP:${s.hp} DEF:${s.def} RES:${s.res}]`);
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
