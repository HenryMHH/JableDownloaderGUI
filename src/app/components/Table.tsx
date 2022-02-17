import { Box, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { ActorVideoItem, ListItem } from '../../service/getListService'

const StyledTable = styled(Box)`
	height: 80vh;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	padding: 5vh 5vw;
	grid-column-gap: 10px;
	grid-row-gap: 1em;
`

const StyledVideoListTable = styled(Box)`
	height: 80vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 3vh 0 3px;
	position: relative;
`

const TableItem = styled(Box)`
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
interface TableData {
	actorList: ListItem[]
	videoList: ActorVideoItem[]
}

export default function Table({ actorList = [], videoList = [] }: TableData) {
	function getActorVideoList(url: string) {
		window.electronAPI.getVideoListByActorLink(url)
	}
	return (
		<>
			{actorList.length > 0 && videoList.length === 0 ? (
				<StyledTable>
					{actorList.map((item) => {
						return (
							<TableItem key={item.href} onClick={() => getActorVideoList(item.href)}>
								<Image h="70px" src={item.imgSrc} />
								<Box ml="5px">
									<Box>{item.name} </Box>
									<Box>{item.number}</Box>
								</Box>
							</TableItem>
						)
					})}
				</StyledTable>
			) : null}

			{videoList.length > 0 ? (
				<StyledVideoListTable>
					<Box ml="5px" display="flex" textAlign="center" position="fixed" w="96.5vw" top="10vh" bg="white">
						<Box w="10vw">番號</Box>
						<Box w="60vw">片名</Box>
						<Box w="10vw">長度</Box>
						<Box w="10vw">觀看數</Box>
						<Box w="10vw">收藏數</Box>
					</Box>
					{videoList.map((item) => (
						<TableItem key={item.indexNO}>
							{/* <Image h="50px" src={item.imgSrc} /> */}
							<Box ml="5px" display="flex">
								<Box w="10vw">{item.indexNO}</Box>
								<Box w="60vw">{item.title}</Box>
								<Box w="10vw">{item.time}</Box>
								<Box w="10vw">{item.views}</Box>
								<Box w="10vw">{item.favorite}</Box>
							</Box>
						</TableItem>
					))}
				</StyledVideoListTable>
			) : null}
		</>
	)
}
