import { Box, Square } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { MdMinimize, MdClose } from 'react-icons/md'

const StyledTitleBar = styled(Box)`
	-webkit-app-region: drag;
	width: 100%;
	display: flex;
	jusitfy-content: space-between;
	align-items: center;
	padding: 0.3rem 1rem;
	background: #fe628e;
	color: white;
`

export default function TitleBar() {
	const isSafetyMode = useSelector((state) => state['safetyModeState'])

	function handleMinimize() {
		window.electronAPI.minimizeWindow()
	}

	function handleClose() {
		const confirmResult = confirm('確定要關閉嗎?')
		if (confirmResult) window.electronAPI.closeWindow()
	}
	return (
		<Box d="flex">
			<StyledTitleBar>
				<Box>{isSafetyMode ? '前端學習軟體' : 'Jable Downloader'}</Box>
			</StyledTitleBar>
			<Box display="flex" bg="#fe628e">
				<Box cursor="pointer" fontSize="1.6em" onClick={handleMinimize} p="3px" mr="4px" zIndex="500">
					<MdMinimize />
				</Box>
				<Box cursor="pointer" fontSize="1.6em" onClick={handleClose} p="3px" mr="4px" zIndex="500">
					<MdClose />
				</Box>
			</Box>
		</Box>
	)
}
