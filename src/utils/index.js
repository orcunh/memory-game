export const CONSTANTS = { USER: 'USER', SCORE_BOARD: 'SCORE_BOARD' };

const flags = ['tr', 'gb', 'us', 'fr', 'it', 'de', 'jp', 'ca'];
// 'ie', 'es', 'cn'
const cards = flags.concat(flags);

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateCards = () => {
  const arr = cards.map((code) => ({
    id: uuidv4(),
    code,
    isFlipped: true,
    isLocked: true,
  }));

  return arr.sort(() => 0.5 - Math.random());
};

export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
};

export const addToScoreBoard = (user, score) => {
  const db = JSON.parse(storage.get(CONSTANTS.SCORE_BOARD)) || [];
  db.push({ user, score });
  storage.set(CONSTANTS.SCORE_BOARD, JSON.stringify(db));
};
