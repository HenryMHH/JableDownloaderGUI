import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Page } from '../App'
import { PaginatorAction } from '../../types/types'

const PaginatorBox = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: baseline;
`

const PageButton = styled(Box)`
	width: 25px;
	height: 25px;
	display: grid;
	place-items: center;
	margin: 0 5px;
	cursor: pointer;
	color: black;
	font-size: 1.3rem;

	&:hover {
		color: #fe628e;
	}
`

interface FooterProps {
	videosPage: Page
	actorsPage: Page
	handleChangePage: (action: PaginatorAction) => void
}

export default function Footer({ videosPage, actorsPage, handleChangePage }: FooterProps) {
	const didMount = useRef(false)
	useEffect(() => {
		if (didMount.current) {
			window.electronAPI.getActorListByPage(actorsPage.currentPage)
		} else {
			didMount.current = true
		}
	}, [actorsPage.currentPage])

	useEffect(() => {
		if (videosPage.currentPage >= 1) {
			// TODO: 這邊會有連打兩次的問題
			window.electronAPI.getVideoListByActorLink({ url: localStorage.getItem('videoListUrl'), page: videosPage.currentPage })
		}
	}, [videosPage.currentPage])

	function paginator(currentPage: number, maxPage: number) {
		return (
			<>
				<PageButton onClick={() => handleChangePage('toFirst')}>{'<<'}</PageButton>
				<PageButton onClick={() => handleChangePage('minus')}>{'<'}</PageButton>
				<Box d="flex" alignItems="center" mx="0.3rem">
					{currentPage}/ {maxPage}
				</Box>
				<PageButton onClick={() => handleChangePage('plus')}>{'>'}</PageButton>
				<PageButton onClick={() => handleChangePage('toLast')}>{'>>'}</PageButton>
			</>
		)
	}
	return (
		<Box>
			<PaginatorBox>{paginator(videosPage.currentPage || actorsPage.currentPage, videosPage.maxPage || actorsPage.maxPage)}</PaginatorBox>
		</Box>
	)
}
