import { Box } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'

const PaginatorBox = styled(Box)`
	display: flex;
`

const PageButton = styled(Box)`
	width: 30px;
	height: 30px;
	display: grid;
	place-items: center;
	border: 1px solid;
	border-radius: 5px;
	margin: 0 5px;
`

export default function Footer({ maxPage }: { maxPage: number }) {
	const [currentPage, setCurrentPage] = useState(0)

	function paginator(page: number) {
		const pageArray = Array.from(Array(page), (n, i) => i + 1)

		if (page > 5) {
			return (
				<>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
						<PageButton>{page}</PageButton>
					))}
				</>
			)
		} else {
			return (
				<>
					{pageArray.map((page) => (
						<PageButton>{page}</PageButton>
					))}
				</>
			)
		}
	}
	return (
		<Box>
			<PaginatorBox>{paginator(maxPage)}</PaginatorBox>
		</Box>
	)
}
