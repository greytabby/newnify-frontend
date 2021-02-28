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

interface RssItem {
  title: string
  description: string
  link: string
  published: string
  guid: string
  read: boolean
}

interface RssChannelFeeds {
  channel: RssChannel
  items: RssItem[]
}

interface RssChannelsState {
  channels: RssChannel[]
  channelFeeds: RssChannelFeeds | null
}

const initialState: RssChannelsState = {
  channels: [],
  channelFeeds: null
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
    },
    feedsFetchFailure: (state, action) => {
      console.log(action)
    },
    feedsFetchSuccess: (state, action: PayloadAction<RssChannelFeeds>) => {
      action.payload.items = action.payload.items.sort((a, b) => {
        const aDate = new Date(a.published)
        const bDate = new Date(b.published)
        return  bDate.getTime() - aDate.getTime()
      })

      state.channelFeeds = action.payload
    }
  }
})

export const { refresh, fetchFailure, fetchSuccess, feedsFetchFailure, feedsFetchSuccess } = rssChannelsSlice.actions

export const refreshAsync = (): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/channels`
  try {
    const resp = await axios.get<RssChannel[]>(url)
    dispatch(fetchSuccess(resp.data))
  } catch (error) {
    dispatch(fetchFailure(error))
  }
}

export const fetchFeedsAsync = (channelId: string): AppThunk => async dispatch => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/channels/${channelId}/feeds`
  try {
    const resp = await axios.get<RssChannelFeeds>(url)
    dispatch(feedsFetchSuccess(resp.data))
  } catch (error) {
    dispatch(feedsFetchFailure(error))
  }
}

export const selectRssChannels = (state: RootState) => state.rssChannels.channels
export const selectRssChannelFeeds = (state: RootState) => state.rssChannels.channelFeeds

export default rssChannelsSlice.reducer
