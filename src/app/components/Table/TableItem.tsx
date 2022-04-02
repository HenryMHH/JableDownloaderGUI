import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Image, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { ActorVideoItem } from '../../../service/getListService'

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

const Item = styled(Box)`
	margin-left: 5px;
	display: flex;
`

export default function TableItem({ item }: { item: ActorVideoItem }) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const cancelRef = useRef()
	function handleDownload(link: string) {
		const rootPath = localStorage.getItem('rootPath')

		if (rootPath) {
			window.electronAPI.beginDownload({ link, rootPath })
		} else {
			alert('請指定下載根目錄!')
		}
	}
	return (
		<StyledTableItem onClick={() => onOpen()}>
			<Item>
				<Box w="10vw">{item.indexNO}</Box>
				<Box w="60vw">{item.title}</Box>
				<Box w="10vw">{item.time}</Box>
				<Box w="10vw">{item.views}</Box>
				<Box w="10vw">{item.favorite}</Box>
			</Item>
			<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>{item.indexNO}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						<Image src={item.imgSrc} w="80%" mx="auto" />
						{item.title}
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							取消
						</Button>
						<Button onClick={() => handleDownload(item.link)} colorScheme="green" ml={3}>
							下載
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</StyledTableItem>
	)
}
