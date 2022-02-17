import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const StyledBg = styled(Box)`
	position: absolute;
	height: 100vh;
	width: 100vw;
	background: #fe628e;
	justify-content: center;
	align-items: center;
`

const ContentBox = styled(Box)`
	border: 5px solid white;
	border-radius: 10px;
	padding: 1rem;
	width: 120px;
	height: 120px;
	font-family: 'Quicksand', sans-serif;
	color: white;
	font-weight: 600;
	font-size: 1.5rem;
`

export default function Opening() {
	const [isVanished, setIsVanished] = useState(false)
	useEffect(() => {
		setTimeout(() => setIsVanished(true), 2000)
	}, [])
	return (
		<StyledBg display={!isVanished ? 'flex' : 'none'}>
			<ContentBox>
				<Box>Dev</Box>
				<Box>Henry</Box>
			</ContentBox>
		</StyledBg>
	)
}
