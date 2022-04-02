import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const safeStateSlice = createSlice({
	name: 'loadingState',
	initialState: initialState,
	reducers: {
		updateSafeState(state, action) {
			return action.payload
		},
	},
})

const { actions, reducer } = safeStateSlice

export const { updateSafeState } = actions
export default reducer
