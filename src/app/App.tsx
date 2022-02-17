import { Box, Button } from '@chakra-ui/react'
import { IpcRendererEvent } from 'electron'
import React, { useEffect, useState } from 'react'
import { ActorVideoInfo, ActorVideoItem, InitInfo, ListItem } from '../service/getListService'
import Footer from './components/Footer'
import TitleBar from './components/TitleBar'
import Opening from './components/Opening'
import Table from './components/Table'
import Header from './components/Header'

function handleInitInfo() {
	window.electronAPI.getActorListByPage(1)
}

export default function App() {
	const [maxPage, setMaxPage] = useState<number>(0)
	const [actorList, setActorList] = useState<ListItem[]>([])
	const [videoList, setVideoList] = useState<ActorVideoItem[]>([])
	const [maxVideoPage, setMaxVideoPage] = useState<number>(0)

	function resetAndBack() {
		setMaxVideoPage(0)
		setVideoList([])
	}

	useEffect(() => {
		window.electronAPI.infoSetter((event: IpcRendererEvent, value: InitInfo) => {
			setMaxPage(value.maxListPage)
			setActorList(value.actorList)
		})

		window.electronAPI.actorVideoListSetter((e: IpcRendererEvent, value: ActorVideoInfo) => {
			setVideoList(value.videoList)
			setMaxVideoPage(value.maxListPage)
		})
		handleInitInfo()
	}, [])
	return (
		<>
			<Opening />
			<Box h="100vh" w="100vw" minW="600px">
				<TitleBar />
				<Header resetAndBack={resetAndBack} />
				<Table actorList={actorList} videoList={videoList} />
				<Footer maxPage={maxPage} maxVideoPage={maxVideoPage} />
			</Box>
		</>
	)
}
