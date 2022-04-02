import { Box, Icon, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { ActorVideoItem, ListItem } from '../../../service/getListService'
import useGetSaftyModeData from '../../hooks/useGetSaftyModeData'
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
	padding: 0 1.5rem;
`

interface TableData {
	actorList: ListItem[]
	videoList: ActorVideoItem[]
	initActorVideoList: (url: string) => void
}

export default function Table({ actorList = [], videoList = [], initActorVideoList }: TableData) {
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	const { fakeData } = useGetSaftyModeData()
	return (
		<>
			{actorList.length > 0 && videoList.length === 0 ? (
				<StyledTable>
					{actorList.map((item, i) => {
						return (
							<StyledTableItem key={item.href} onClick={() => initActorVideoList(item.href)}>
								{isSafetyMode ? <Icon w="50px" height="50px" as={fakeData[i].icon} /> : <Image h="70px" src={item.imgSrc} />}
								<Box ml="5px">
									<Box>{isSafetyMode ? fakeData[i].title : item.name}</Box>
									<Box>{isSafetyMode ? `學習時數:${Math.floor(Math.random() * 100)}小時` : item.number}</Box>
								</Box>
							</StyledTableItem>
						)
					})}
				</StyledTable>
			) : null}

			{videoList.length > 0 ? (
				<Box>
					<TitleBar>
						<Box w="10vw">{isSafetyMode ? '項次' : '番號'}</Box>
						<Box w="60vw">{isSafetyMode ? '文章名' : '片名'}</Box>
						<Box w="10vw">長度</Box>
						<Box w="10vw">觀看數</Box>
						<Box w="10vw">收藏數</Box>
					</TitleBar>
					<StyledVideoListTable>
						{videoList.map((item, index) => (
							<TableItem item={item} index={index} key={item.title + `${index}`} />
						))}
					</StyledVideoListTable>
				</Box>
			) : null}
		</>
	)
}
