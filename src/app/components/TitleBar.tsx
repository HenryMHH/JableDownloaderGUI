import { Box, Square } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

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
	return (
		<StyledTitleBar>
			<Box>Jable Downloader</Box>
		</StyledTitleBar>
	)
}
