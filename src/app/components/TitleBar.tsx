import { Box, Square } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

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
	return (
		<StyledTitleBar>
			<Box>{isSafetyMode ? '前端學習軟體' : 'Jable Downloader'}</Box>
		</StyledTitleBar>
	)
}
