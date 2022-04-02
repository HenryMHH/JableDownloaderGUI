import { Spinner, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const StyledBg = styled(Box)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	background: rgba(255, 255, 255, 0.5);
`

export default function Loading() {
	return (
		<StyledBg>
			<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
		</StyledBg>
	)
}
