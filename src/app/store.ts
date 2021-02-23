import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rssChannelsReducer from '../features/rsschannels/rssChannelsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rssChannels: rssChannelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
