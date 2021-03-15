import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rssChannelsReducer from '../features/rsschannels/rssChannelsSlice';
import twitterReducer from '../features/tweet/tweetSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rssChannels: rssChannelsReducer,
    twitter: twitterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
