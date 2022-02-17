import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import { ListItem } from '../../service/getListService'

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
	maxPage: number
	setActorList?: React.Dispatch<ListItem[]>
	maxVideoPage: number
}

export default function Footer({ maxPage, maxVideoPage }: FooterProps) {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const didMount = useRef(false)
	function handleChangePage(action: 'plus' | 'minus' | 'toFirst' | 'toLast') {
		switch (action) {
			case 'plus':
				if (currentPage < maxPage) {
					setCurrentPage(currentPage + 1)
				}
				return
			case 'minus':
				if (currentPage > 1) {
					setCurrentPage(currentPage - 1)
				}
				return
			case 'toFirst':
				setCurrentPage(1)
				return
			case 'toLast':
				setCurrentPage(maxPage)
				return
			default:
				return
		}
	}

	useEffect(() => {
		if (didMount.current) {
			window.electronAPI.getActorListByPage(currentPage)
		} else {
			didMount.current = true
		}
	}, [currentPage])

	function paginator(maxPage: number) {
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
			<PaginatorBox>{paginator(maxVideoPage || maxPage)}</PaginatorBox>
		</Box>
	)
}
