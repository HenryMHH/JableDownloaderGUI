import { Box, Button, Switch, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Page } from '../App'
import { PaginatorAction } from '../../types/types'
import { useSelector } from 'react-redux'
import ColorModeSwitch from './ColorModeSwitch'
import SafetyModeSwitch from './SafetyModeSwitch'
import CurrentDownload from './CurrentDownload'

const PaginatorBox = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: baseline;
`

const PageButton = styled(Button)`
	width: 18px;
	height: 25px;
	display: grid;
	place-items: center;
	margin: 0 3px;
	cursor: pointer;
	font-size: 1.3rem;
	background: transparent;
	cursor: pointer;
	&:hover {
		color: #fe628e;
		background: transparent;
	}
`

interface FooterProps {
	videosPage: Page
	actorsPage: Page
	handleChangePage: (action: PaginatorAction) => void
}

export default function Footer({ videosPage, actorsPage, handleChangePage }: FooterProps) {
	const didMount = useRef(false)
	const { videoListUrl } = useSelector((state) => state['downloadState'])

	useEffect(() => {
		if (didMount.current) {
			window.electronAPI.getActorListByPage(actorsPage.currentPage)
		} else {
			didMount.current = true
		}
	}, [actorsPage.currentPage])

	useEffect(() => {
		if (videosPage.currentPage >= 1 && videoListUrl) {
			window.electronAPI.getVideoListByActorLink({ url: videoListUrl, page: videosPage.currentPage })
		}
	}, [videosPage.currentPage, videoListUrl])

	function paginator(currentPage: number, maxPage: number) {
		return (
			<>
				<PageButton disabled={currentPage === 1} onClick={() => handleChangePage('toFirst')}>
					{'<<'}
				</PageButton>
				<PageButton disabled={currentPage === 1} onClick={() => handleChangePage('minus')}>
					{'<'}
				</PageButton>
				<Box d="flex" alignItems="center" mx="0.3rem">
					{currentPage} / {maxPage}
				</Box>
				<PageButton disabled={currentPage === maxPage} onClick={() => handleChangePage('plus')}>
					{'>'}
				</PageButton>
				<PageButton disabled={currentPage === maxPage} onClick={() => handleChangePage('toLast')}>
					{'>>'}
				</PageButton>
			</>
		)
	}
	return (
		<Box position="relative" pt="1rem">
			<PaginatorBox>{paginator(videosPage.currentPage || actorsPage.currentPage, videosPage.maxPage || actorsPage.maxPage)}</PaginatorBox>
			<CurrentDownload />
			<SafetyModeSwitch />
		</Box>
	)
}
