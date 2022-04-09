import { Box, Button } from '@chakra-ui/react'
import { IpcRendererEvent } from 'electron'
import React, { useEffect, useState } from 'react'
import { ActorVideoInfo, ActorVideoItem, InitInfo, ListItem } from '../service/getListService'
import Footer from './components/Footer'
import TitleBar from './components/TitleBar'
import Opening from './components/Opening'
import Table from './components/Table/Table'
import Header from './components/Header'
import useToastHook from './hooks/useToastHook'
import { PaginatorAction } from '../types/types'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoadingState } from '../reducers/loadingStateSlice'
import { updateDownloadState } from '../reducers/downloadStateSlice'

function handleInitInfo() {
	window.electronAPI.getActorListByPage(1)
}

export interface Page {
	currentPage: number
	maxPage: number
}

export default function App() {
	const [actorsPage, setActorsPage] = useState<Page>({ maxPage: 0, currentPage: 1 })
	const [videosPage, setVideosPage] = useState<Page>({ maxPage: 0, currentPage: 0 })
	const [actorList, setActorList] = useState<ListItem[]>([])
	const [videoList, setVideoList] = useState<ActorVideoItem[]>([])
	const dispatch = useDispatch()
	const isLoading = useSelector((state) => state['loadingState'])

	const { setTip } = useToastHook()
	function resetAndBack() {
		setVideosPage({ maxPage: 0, currentPage: 0 })
		setVideoList([])
	}

	// 註冊所有的electronApi事件
	useEffect(() => {
		window.electronAPI.errorMessenger((e, message: string) => {
			setTip({ status: 'error', msg: message })
			if (message.includes('程序中斷')) {
				dispatch(updateDownloadState({ currentDownloadName: '', percentage: '' }))
			}
		})
		window.electronAPI.successMessenger((e, message: string) => {
			setTip({ status: 'success', msg: message })

			// 下載完成以後清除當前下載檔案名稱
			if (message.includes('下載完成')) {
				dispatch(updateDownloadState({ currentDownloadName: '', percentage: '' }))
			}
		})
		window.electronAPI.getPercentage((e, percentage: number) => {
			dispatch(updateDownloadState({ percentage }))
		})
		window.electronAPI.actorVideoListSetter((e: IpcRendererEvent, value: ActorVideoInfo) => {
			setVideoList(value.videoList)
			// 爬蟲目標最後一頁的paginator會是最大頁數減1，避免頁數顯示異常，只要maxPage小於前面爬蟲的結果都不給複寫
			setVideosPage((pre) => {
				if (pre.maxPage > value.maxListPage) {
					return pre
				} else {
					return { ...pre, maxPage: value.maxListPage }
				}
			})
			dispatch(updateLoadingState(false))
		})
		window.electronAPI.infoSetter((event: IpcRendererEvent, value: InitInfo) => {
			setActorList(value.actorList)
			// 爬蟲目標最後一頁的paginator會是最大頁數減1，避免頁數顯示異常，只要maxPage小於前面爬蟲的結果都不給複寫
			setActorsPage((pre) => {
				if (pre.maxPage > value.maxListPage) {
					return pre
				} else {
					return { ...pre, maxPage: value.maxListPage }
				}
			})
			dispatch(updateLoadingState(false))
		})
	}, [])

	useEffect(() => {
		// 當App component mount的時候送出第一頁資料的fetch request
		handleInitInfo()
	}, [])

	function initActorVideoList(url: string) {
		setVideosPage((pre) => (pre = { ...pre, currentPage: 1 }))
		dispatch(updateDownloadState({ videoListUrl: url }))
		dispatch(updateLoadingState(true))
	}

	function handleChangePage(action: PaginatorAction) {
		let currentPage = videosPage.currentPage || actorsPage.currentPage
		let maxPage = videosPage.maxPage || actorsPage.maxPage
		let cb = videosPage.maxPage ? setVideosPage : setActorsPage
		dispatch(updateLoadingState(true))
		switch (action) {
			case 'plus':
				if (currentPage < maxPage) {
					cb((pre) => (pre = { ...pre, currentPage: currentPage + 1 }))
				}
				return
			case 'minus':
				if (currentPage > 1) {
					cb((pre) => (pre = { ...pre, currentPage: currentPage - 1 }))
				}
				return
			case 'toFirst':
				cb((pre) => (pre = { ...pre, currentPage: 1 }))
				return
			case 'toLast':
				cb((pre) => (pre = { ...pre, currentPage: maxPage }))
				return
			default:
				return
		}
	}
	return (
		<>
			{process.env.NODE_ENV !== 'development' && <Opening />}
			{isLoading && <Loading />}
			<Box h="100vh" w="100vw" minW="600px">
				<TitleBar />
				<Header resetAndBack={resetAndBack} videoList={videoList} />
				<Table actorList={actorList} videoList={videoList} initActorVideoList={initActorVideoList} />
				<Footer handleChangePage={handleChangePage} actorsPage={actorsPage} videosPage={videosPage} />
			</Box>
		</>
	)
}
