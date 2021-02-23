import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'

interface RssChannel {
  id: string
  title: string
  link: string
  rssLink: string
  description: string
}

interface RssChannelsState {
  channels: RssChannel[]
}

const initialState: RssChannelsState = {
  channels: []
}

export const rssChannelsSlice = createSlice({
  name: 'rssChannels',
  initialState,
  reducers: {
    refresh: (state, action: PayloadAction<RssChannel[]>) => {
      // console.log(action.payload, state.channels)
      // action.payload.map((v) => state.channels.push(v))
    },
    fetchFailure: (state, action) => {
      console.log(action)
    },
    fetchSuccess: (state, action: PayloadAction<RssChannel[]>) => {
      state.channels.splice(0, state.channels.length, ...action.payload)
    }
  }
})

export const { refresh, fetchFailure, fetchSuccess } = rssChannelsSlice.actions

export const refreshAsync = (): AppThunk => async dispatch => {
  const url = 'http://localhost:7777/channels'
  try {
    const resp = await axios.get<RssChannel[]>(url)
    dispatch(fetchSuccess(resp.data))
  } catch (error) {
    dispatch(fetchFailure(error))
  }
}

export const selectRssChannels = (state: RootState) => state.rssChannels.channels

export default rssChannelsSlice.reducer
