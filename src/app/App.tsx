import { Box, Button } from '@chakra-ui/react'
import { IpcRendererEvent } from 'electron'
import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Opening from './components/Opening'

export default function App() {
	const [maxPage, setMaxPage] = useState<number>(0)
	window.electronAPI.getMaxPage((event: IpcRendererEvent, value: number) => setMaxPage(value))

	useEffect(() => {
		window.electronAPI.fetchMaxPage()
	}, [])
	return (
		<>
			<Opening />
			<Box h="100vh" w="100vw" minW="600px">
				<Header />
				{maxPage}
				Hello,world!!!!!!
				<Footer maxPage={maxPage} />
			</Box>
		</>
	)
}
