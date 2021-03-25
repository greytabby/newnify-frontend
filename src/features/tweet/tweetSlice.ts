import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'
import {Status as Tweet} from 'twitter-d'

interface twitterState {
  tweets: Tweet[]
  fetching: boolean
}

const initialState: twitterState = {
  tweets: [],
  fetching: false,
}

export const twitterSlice = createSlice({
  name: 'twitter',
  initialState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload
    },
    fetchTimelineStart: (state) => {
      state.fetching = true
    },
    fetchTimelineFailure: (state, action) => {
      console.log(action)
      state.fetching = false
    },
    fetchTimelineSuccess: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets.splice(0, state.tweets.length, ...action.payload)
      state.fetching = false
    },
  }
})

export const { setFetching, fetchTimelineStart, fetchTimelineFailure, fetchTimelineSuccess } = twitterSlice.actions

export const fetchTimelenAsync = (): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/tweets`
  dispatch(fetchTimelineStart())
  try {
    const resp = await axios.get<Tweet[]>(url)
    dispatch(fetchTimelineSuccess(resp.data))
  } catch (error) {
    dispatch(fetchTimelineFailure(error))
  } finally {
    dispatch(setFetching(false))
  }
}

export const selectTweets = (state: RootState) => state.twitter.tweets
export const selectFetching = (state: RootState) => state.twitter.fetching

export default twitterSlice.reducer
