import { createSlice } from '@reduxjs/toolkit'

const initialState = { currentDownloadName: '', videoListUrl: '', percentage: '' }

const downloadStateSlice = createSlice({
	name: 'downloadState',
	initialState: initialState,
	reducers: {
		updateDownloadState(state, action) {
			return { ...state, ...action.payload }
		},
	},
})

const { actions, reducer } = downloadStateSlice

export const { updateDownloadState } = actions
export default reducer
