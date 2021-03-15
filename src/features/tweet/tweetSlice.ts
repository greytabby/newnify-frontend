import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'
import {Status as Tweet} from 'twitter-d'

interface twitterState {
  tweets: Tweet[]
}

const initialState: twitterState = {
  tweets: []
}

export const twitterSlice = createSlice({
  name: 'twitter',
  initialState,
  reducers: {
    fetchTimelineFailure: (state, action) => {
      console.log(action)
    },
    fetchTimelineSuccess: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets.splice(0, state.tweets.length, ...action.payload)
    },
  }
})

export const { fetchTimelineFailure, fetchTimelineSuccess } = twitterSlice.actions

export const fetchTimelenAsync = (): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/tweets`
  try {
    const resp = await axios.get<Tweet[]>(url)
    dispatch(fetchTimelineSuccess(resp.data))
  } catch (error) {
    dispatch(fetchTimelineFailure(error))
  }
}

export const selectTweets = (state: RootState) => state.twitter.tweets

export default twitterSlice.reducer
