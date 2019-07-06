export const prettifyValue = value => Number(value.toFixed(2));
export const pickRndValueFromArray = arr => arr[Math.floor(Math.random() * arr.length)];
const nulify = num => (num < 0 ? 0 : num);

export default class FIghterBase {
  calcAttack(res, def = 0) {
    const value = nulify(this.attack) * (1 - res) - nulify(def);
    return value < 0 ? 0 : prettifyValue(value);
  }

  getFinalModifier(res, def) {
    return this.plans[this.plan].getModifier(res, def);
  }

  getStats() {
    return {
      hp: prettifyValue(this.hp),
      def: prettifyValue(this.defense),
      res: prettifyValue(this.resistance),
      attack: prettifyValue(this.attack),
    };
  }

  getPlan(res) {
    return this.plans[this.plan].toString(res);
  }

  flash(method, attribute, value) {
    if (!this[method]) {
      this[method] = [];
    }
    this[attribute] += value;
    this[method].push([attribute, -value]);
  }

  reset(method) {
    this[method].forEach(([attribute, value]) => {
      this[attribute] += value;
    });
    this[method] = [];
  }
}
