import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CurrentDownload() {
	const { currentDownloadName, percentage } = useSelector((state) => state['downloadState'])
	return (
		<>
			{currentDownloadName && (
				<Box position="absolute" left="7rem" top="0">
					{currentDownloadName} : {percentage}
				</Box>
			)}
		</>
	)
}
