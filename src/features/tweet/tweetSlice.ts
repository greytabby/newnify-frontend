import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'
import {Status as Tweet} from 'twitter-d'
import {TwitterList,
  GetHomeTimelineResponse,
  GetTwitterListsReponse,
  GetTwitterListTimelineResponse
} from './types'

interface twitterState {
  tweets: Tweet[]
  lists: TwitterList[]
  fetching: boolean
}

const initialState: twitterState = {
  tweets: [],
  lists: [],
  fetching: false,
}

export const twitterSlice = createSlice({
  name: 'twitter',
  initialState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload
    },
    fetchTimelineFailure: (state, action) => {
      console.log(action)
      state.fetching = false
    },
    fetchTimelineSuccess: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets.splice(0, state.tweets.length, ...action.payload)
      state.fetching = false
    },
    fetchTwitterListsFailure: (state, action) => {
      console.log(action)
    },
    fetchTwitterListsSuccess: (state, action: PayloadAction<TwitterList[]>) => {
      state.lists.splice(0, state.lists.length, ...action.payload)
    },
    fetchTwitterListTimelineFailure: (state, action) => {
      console.log(action)
      state.fetching = false
    },
    fetchTwitterListTimelineSuccess: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets.splice(0, state.tweets.length, ...action.payload)
      state.fetching = false
    },
  }
})

export const {
  setFetching,
  fetchTimelineFailure,
  fetchTimelineSuccess,
  fetchTwitterListsFailure,
  fetchTwitterListsSuccess,
  fetchTwitterListTimelineFailure,
  fetchTwitterListTimelineSuccess,
} = twitterSlice.actions

export const fetchTimelenAsync = (): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/twitter/hometimeline`
  dispatch(setFetching(true))
  try {
    const resp = await axios.get<GetHomeTimelineResponse>(url)
    dispatch(fetchTimelineSuccess(resp.data.data))
  } catch (error) {
    dispatch(fetchTimelineFailure(error))
  } finally {
    dispatch(setFetching(false))
  }
}

export const fetchTwitterLists = (): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/twitter/lists`
  try {
    const resp = await axios.get<GetTwitterListsReponse>(url)
    dispatch(fetchTwitterListsSuccess(resp.data.data))
  } catch (error) {
    dispatch(fetchTwitterListsFailure(error))
  }
}

export const fetchTwitterListTimeline = (listId: string): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/twitter/lists/${listId}/timeline`
  dispatch(setFetching(true))
  try {
    const resp = await axios.get<GetTwitterListTimelineResponse>(url)
    dispatch(fetchTwitterListTimelineSuccess(resp.data.data))
  } catch (error) {
    dispatch(fetchTwitterListTimelineFailure(error))
  } finally {
    dispatch(setFetching(false))
  }
}

export const selectTweets = (state: RootState) => state.twitter.tweets
export const selectFetching = (state: RootState) => state.twitter.fetching
export const selectTwitterLists = (state: RootState) => state.twitter.lists

export default twitterSlice.reducer
