import { configureStore } from '@reduxjs/toolkit'
import loadingState from '../reducers/loadingStateSlice'
import downloadState from '../reducers/downloadStateSlice'
import safetyModeState from '../reducers/safeStateSlice'

const store = configureStore({
	reducer: {
		loadingState,
		downloadState,
		safetyModeState,
	},
})

export default store
