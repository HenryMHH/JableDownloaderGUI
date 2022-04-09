import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Icon,
	Image,
	useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { updateDownloadState } from '../../../reducers/downloadStateSlice'
import { ActorVideoItem } from '../../../service/getListService'
import useGetSaftyModeData from '../../hooks/useGetSaftyModeData'

const StyledTableItem = styled(Box)`
	// overflow: hidden;
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	&:hover {
		border: 1px solid #fe628e;
		margin: -1px;
	}
`

const Item = styled(Box)`
	margin-left: 5px;
	display: flex;
	position: relative;
	align-items: center;
`

const IconBox = styled(Box)`
	position: absolute;
	left: -1rem;
	z-index: 500;
	color: ;
`

export default function TableItem({ item, index }: { item: ActorVideoItem; index: number }) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	const { fakeData, fakeArticle } = useGetSaftyModeData()
	const dispatch = useDispatch()
	const { currentDownloadName } = useSelector((state) => state['downloadState'])
	const downloadHistory = localStorage.getItem('downloadHistory') ? (JSON.parse(localStorage.getItem('downloadHistory')) as Array<string>) : []
	const cancelRef = useRef()
	function handleDownload(link: string) {
		const rootPath = localStorage.getItem('rootPath')
		if (rootPath) {
			if (downloadHistory) {
				if (downloadHistory.includes(item.indexNO)) {
					const confirmResult = confirm('本片曾經下載過，確定要再次下載或繼續未完成下載?')
					if (confirmResult) {
						dispatch(updateDownloadState({ currentDownloadName: item.indexNO }))
						window.electronAPI.beginDownload({ link, rootPath })
					}
				} else {
					dispatch(updateDownloadState({ currentDownloadName: item.indexNO }))
					window.electronAPI.beginDownload({ link, rootPath })
					localStorage.setItem('downloadHistory', JSON.stringify([...downloadHistory, item.indexNO]))
				}
			} else {
				window.electronAPI.beginDownload({ link, rootPath })
				localStorage.setItem('downloadHistory', JSON.stringify([item.indexNO]))
			}
		} else {
			alert('請指定下載根目錄!')
		}
	}
	return (
		<StyledTableItem onClick={() => onOpen()}>
			<Item>
				<IconBox>{downloadHistory.includes(item.indexNO) && <AiFillCheckCircle />}</IconBox>
				<Box w="10vw" textAlign="center">
					{isSafetyMode ? index : item.indexNO}
				</Box>
				<Box w="60vw">{isSafetyMode ? fakeArticle[index] : item.title}</Box>
				<Box w="10vw">{item.time}</Box>
				<Box w="10vw">{item.views}</Box>
				<Box w="10vw">{item.favorite}</Box>
			</Item>
			<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>{isSafetyMode ? `項次: ${index}` : `番號: ${item.indexNO}`}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						{isSafetyMode ? <Icon display="block" w="40%" h="40%" mx="auto" as={fakeData[0].icon} /> : <Image src={item.imgSrc} w="80%" mx="auto" />}
						{isSafetyMode ? fakeArticle[index] : item.title}
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							取消
						</Button>
						<Button disabled={currentDownloadName} onClick={() => handleDownload(item.link)} colorScheme="green" ml={3}>
							{!isSafetyMode ? (
								<>
									{currentDownloadName === item.indexNO ? '當前下載中' : ''}
									{currentDownloadName && currentDownloadName !== item.indexNO ? '其他檔案下載中，請稍後' : ''}
									{!currentDownloadName ? '下載' : ''}
								</>
							) : (
								<>前往閱讀文章</>
							)}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</StyledTableItem>
	)
}
