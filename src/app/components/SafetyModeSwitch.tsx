import { Box, Switch } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSafeState } from '../../reducers/safeStateSlice'

export default function SafetyModeSwitch() {
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	const dispatch = useDispatch()
	function handleToggle(e) {
		dispatch(updateSafeState(e.target.checked))
	}
	return (
		<Box display="flex" position="absolute" alignItems="center" top="0" right="0" pr="1rem">
			<Switch isChecked={isSafetyMode} onChange={handleToggle} px="4px" />
			{isSafetyMode && <Box>閱讀模式</Box>}
			{!isSafetyMode && <Box>正常模式</Box>}
		</Box>
	)
}
