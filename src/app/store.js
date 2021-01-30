import { configureStore } from '@reduxjs/toolkit';
import gamereducer from './gameSlice';

export default configureStore({
  reducer: {
    game: gamereducer,
  },
});
