import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const loadingStateSlice = createSlice({
	name: 'loadingState',
	initialState: initialState,
	reducers: {
		updateLoadingState(state, action) {
			return action.payload
		},
	},
})

const { actions, reducer } = loadingStateSlice

export const { updateLoadingState } = actions
export default reducer
