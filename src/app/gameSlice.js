import { createSlice } from '@reduxjs/toolkit';

import { generateCards, addToScoreBoard, storage, CONSTANTS } from '../utils';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    user: storage.get(CONSTANTS.USER) || null,
    cards: null,
    clickCount: 0,
    isCompleted: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      storage.set(CONSTANTS.USER, payload);
      state.user = payload;
    },
    removeUser: (state) => {
      storage.remove(CONSTANTS.USER);
      state.user = null;
    },
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
    flipCard: (state, { payload }) => {
      const newCards = [...state.cards];
      const index = state.cards.findIndex((x) => x.id === payload.id);
      newCards[index] = payload;

      if (state.clickCount > 0) {
        const index = newCards.findIndex((x) => x.isLocked === false);
        if (index === -1) {
          // all flags are matched
          state.isCompleted = true;
          addToScoreBoard(state.user, state.clickCount);
        }
      }

      state.cards = newCards;
    },
    increaseCount: (state) => {
      state.clickCount += 1;
    },
    resetGame: (state) => {
      state.clickCount = 0;
      state.isCompleted = false;
    },
  },
});

export const {
  setCards,
  setUser,
  removeUser,
  flipCard,
  setCount,
  increaseCount,
  resetGame,
} = gameSlice.actions;

export const user = (state) => state.game.user;
export const cardList = (state) => state.game.cards;
export const clickCount = (state) => state.game.clickCount;
export const isCompleted = (state) => state.game.isCompleted;

let timer = null;

export const shuffleCards = () => (dispatch) => {
  const cards = generateCards();
  dispatch(setCards(cards));
  dispatch(resetGame());

  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    let index = 0;
    for (const card of cards) {
      setTimeout(
        () => dispatch(flipCard({ ...card, isFlipped: false, isLocked: false })),
        index++ * 50
      );
    }
  }, 3000);
};

export default gameSlice.reducer;
