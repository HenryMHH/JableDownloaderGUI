import { Box, Square } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

export default function Header() {
	function handleRelaunch() {
		window.electronAPI.reloadForFetch()
	}
	return (
		<Box w="100%" display="flex" justifyContent="space-between" alignItems="center" p="1rem">
			<Box>Jable Downloader</Box>
			<Box>
				<Square onClick={handleRelaunch}>
					<AiOutlineReload />
				</Square>
			</Box>
		</Box>
	)
}
