import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { sleep } from '../../utils/sleep'

const FadeOut = keyframes`
	0%{
		opacity:1;
	}
	100%{
		opacity:0;
	}
`

const InitBox = keyframes`
	0%{
		opacity:0;
	}
	10%{
		opacity:1;
		width:0px;
	}
	50%{
		width:120px;
		height:0px;
		margin-bottom:120px;
	}
	99%{
		padding:0;
	}
	100%{
		width:120px;
		height:120px;
		margin-bottom:0px;
		padding: 1rem;
	}
`

const Blink = keyframes`
	0%{
		opacity:0;
	}
	100%{
		opacity:1;
	}
`

const StyledBg = styled(Box)`
	position: absolute;
	height: 100vh;
	width: 100vw;
	background: #fe628e;
	justify-content: center;
	align-items: center;
	display: flex;
	animation: ${FadeOut} 1s ease 4.5s forwards;
	z-index: 9998;
`

const ContentBox = styled(Box)`
	border: 5px solid white;
	border-radius: 10px;
	width: 0px;
	height: 0px;
	font-family: 'Quicksand', sans-serif;
	color: white;
	font-weight: 600;
	font-size: 1.5rem;
	margin-bottom: 120px;
	animation: ${InitBox} 2s ease forwards;
	opacity: 1;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
`

const ContextBox = styled(Box)`
	height: 1.1em;
	line-height: 1.1em;
	display: flex;
`

const BlinkLine = styled(Box)`
	width: 2px;
	height: 100%;
	background: white;
	margin-left: 0.3em;
	animation: ${Blink} 0.5s ease infinite;
`

function SingleText({ word }: { word: string }) {
	const [context, setContext] = useState<string>('')
	async function setter() {
		for (const char of word.split('')) {
			setContext((pre) => (pre += char))
			await sleep(200)
		}
	}
	useEffect(() => {
		setter()
	}, [word])

	const isMaxLength = context.length === word.length
	return (
		<ContextBox w={isMaxLength ? '100%' : 'auto'}>
			{context}
			{!isMaxLength && <BlinkLine />}
		</ContextBox>
	)
}

export default function Opening() {
	const [isVanished, setIsVanished] = useState<boolean>(false)
	const [step, setStep] = useState<number>(0)
	useEffect(() => {
		setTimeout(() => setStep(1), 2000)
		setTimeout(() => setStep(2), 3200)
		setTimeout(() => setIsVanished(true), 5500)
	}, [])
	return (
		<>
			{!isVanished && (
				<StyledBg>
					<ContentBox>
						{step >= 1 && <SingleText word="Dev" />}
						{step >= 2 && <SingleText word="Henry" />}
					</ContentBox>
				</StyledBg>
			)}
		</>
	)
}
