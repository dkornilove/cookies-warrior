const createDifficulty = (multiplier, activeCookies, cookiesCount, levels) => (
  {
    multiplier,
    activeCookies,
    cookiesCount,
    levels,
  });

export default {
  Powerless: createDifficulty(0.8, 4, 20, 8),
  Vigorous: createDifficulty(1, 4, 18, 9),
  Charged: createDifficulty(1.2, 3, 16, 10),
  Deadly: createDifficulty(1.4, 3, 14, 11),
};
