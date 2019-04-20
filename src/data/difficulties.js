const createDifficulty = (damageMultiplayer, cookiesTouse, levels) => (
  { damageMultiplayer, cookiesTouse, levels });

export default {
  Powerless: createDifficulty(0.7, 5, 8),
  Vigorous: createDifficulty(0.9, 4, 9),
  Charged: createDifficulty(1, 4, 10),
  Deadly: createDifficulty(1.2, 3, 12),
};
