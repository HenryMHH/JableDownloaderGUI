import { Box, Square } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

export default function Header({ resetAndBack }) {
	function handleRelaunch() {
		window.electronAPI.reloadWindow()
	}
	return (
		<Box display="flex" justifyContent="flex-end" alignItems="center">
			<Box p="0.3rem" onClick={() => resetAndBack()}>
				回前頁
			</Box>
			<Box p="0.3rem">
				<Square onClick={handleRelaunch}>
					<AiOutlineReload />
				</Square>
			</Box>
		</Box>
	)
}
