import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CurrentDownload() {
	const { currentDownloadName, percentage } = useSelector((state) => state['downloadState'])
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	return (
		<>
			{currentDownloadName && !isSafetyMode && (
				<Box position="absolute" left="1rem" top="1rem">
					當前下載片名 {currentDownloadName} : 下載進度 {percentage || '0.0'} %
				</Box>
			)}
		</>
	)
}
