import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface drawerState {
  open: boolean
}

const initialState: drawerState = {
  open: false
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  }
})

// actions
export const { setOpen } = drawerSlice.actions

// selector
export const selectDrawerOpen = (state: RootState) => state.drawer.open

export default drawerSlice.reducer
