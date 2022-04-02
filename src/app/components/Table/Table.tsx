import { Box, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { ActorVideoItem, ListItem } from '../../../service/getListService'
import TableItem from './TableItem'

const StyledTable = styled(Box)`
	height: 80vh;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(5, 1fr);
	padding: 5vh 5vw;
	grid-column-gap: 10px;
	grid-row-gap: 1em;
`

const StyledTableItem = styled(Box)`
	overflow: hidden;
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	&:hover {
		border: 1px solid #fe628e;
		margin: -1px;
	}
`

const StyledVideoListTable = styled(Box)`
	height: 78vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 0 1rem 1rem;
`

const TitleBar = styled(Box)`
	display: flex;
	text-align: center;
	background: white;
	padding: 0 1.5rem;
`

interface TableData {
	actorList: ListItem[]
	videoList: ActorVideoItem[]
	initActorVideoList: (url: string) => void
}

export default function Table({ actorList = [], videoList = [], initActorVideoList }: TableData) {
	return (
		<>
			{actorList.length > 0 && videoList.length === 0 ? (
				<StyledTable>
					{actorList.map((item) => {
						return (
							<StyledTableItem key={item.href} onClick={() => initActorVideoList(item.href)}>
								<Image h="70px" src={item.imgSrc} />
								<Box ml="5px">
									<Box>{item.name} </Box>
									<Box>{item.number}</Box>
								</Box>
							</StyledTableItem>
						)
					})}
				</StyledTable>
			) : null}

			{videoList.length > 0 ? (
				<Box>
					<TitleBar>
						<Box w="10vw">番號</Box>
						<Box w="60vw">片名</Box>
						<Box w="10vw">長度</Box>
						<Box w="10vw">觀看數</Box>
						<Box w="10vw">收藏數</Box>
					</TitleBar>
					<StyledVideoListTable>
						{videoList.map((item, index) => (
							<TableItem item={item} key={item.title + `${index}`} />
						))}
					</StyledVideoListTable>
				</Box>
			) : null}
		</>
	)
}
