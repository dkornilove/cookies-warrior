export default class Stage {
  constructor(player, monster, modifier) {
    this.player = player;
    this.monster = monster;
    this.modifier = modifier;
    this.cookiesToOffer = {
      offer: null,
      available: player.cookiesPerMove,
    };
  }

  initialize() {
    this.player.getModifiers().forEach(m => this.applyModifier(m));
    this.applyModifier(this.modifier);
    this.monster.setPlan();
    return this.getStats();
  }

  processMove() {
    const result = {};
    const { res, def } = this.player.getStats();
    const monsterModifier = this.monster.getFinalModifier(res, def);
    this.applyModifier(monsterModifier);
    result.message = {
      monsterModifier,
    };
    if (this.player.hp > 0) {
      const { res: mRes, def: mDef } = this.monster.getStats();
      const playerModifier = this.player.getFinalModifier(mRes, mDef);
      this.applyModifier(playerModifier);
      result.message.playerModifier = playerModifier;
      result.status = this.monster.hp > 0 ? 'not-finished' : 'passed';
    } else {
      result.status = 'dead';
    }
    this.player.reset('boost');
    this.monster.reset('boost');
    this.monster.setPlan();
    if (result.status === 'passed') {
      result.canContinue = this.player.processStagePassed();
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
    modifier.modificators
      .forEach(m => this[m.target].flash(m.method, m.attribute, Number(m.value)));
  }

  getStats() {
    const playerStats = this.player.getStats();
    const monsterStats = this.monster.getStats();
    const playerplan = this.player.getPlan(monsterStats.res);
    const monsterplan = this.monster.getPlan(playerStats.res);
    return {
      player: playerStats,
      playerplan,
      monster: monsterStats,
      monsterplan,
    };
  }
}
