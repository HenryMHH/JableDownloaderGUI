import React from 'react'
import { Drawer, DrawerBody, DrawerFooter, Tooltip, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Box, Tag } from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import ColorModeSwitch from './ColorModeSwitch'
import { useSelector } from 'react-redux'
import { CgCloseO } from 'react-icons/cg'
import { BsGithub } from 'react-icons/bs'

export default function SideDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { currentDownloadName, percentage } = useSelector((state) => state['downloadState'])
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	function suspendDownload() {
		const confirmResult = confirm(`確定要取消當前下載嗎?`)
		if (confirmResult) {
			window.electronAPI.stopCurrentDownload()
		}
	}

	function handleOpenChrome() {
		// 聯繫作者，開啟作者的github
		window.electronAPI.openChrome('https://github.com/HenryMHH')
	}
	return (
		<>
			<Box onClick={onOpen} mx="1rem" border="1px solid" borderRadius="4px" p="4px" cursor="pointer" _hover={{ background: '#fe628e', opacity: 0.5, color: 'white' }}>
				<MdMenu />
			</Box>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent mt="35px" maxW="280px" h="calc(100vh - 35px)">
					<DrawerCloseButton />
					<DrawerHeader>資訊列表</DrawerHeader>
					<DrawerBody>
						<Box>{isSafetyMode && '學習資源'}下載佇列</Box>
						{currentDownloadName && (
							<Box>
								<Box d="flex" alignItems="center" cursor="pointer">
									{isSafetyMode ? '演算法教材' : currentDownloadName}: {percentage}%
									<Box fontSize="1.3rem" ml="1em" color="red" onClick={suspendDownload}>
										<CgCloseO />
									</Box>
								</Box>
							</Box>
						)}
					</DrawerBody>

					<DrawerFooter alignItems="center" justifyContent="space-between" pb="1rem">
						<Box onClick={handleOpenChrome} fontSize="1.5rem" color="#fe628e" cursor="pointer">
							<Tooltip placement="top-start" label="聯繫作者">
								<Box>
									<BsGithub />
								</Box>
							</Tooltip>
						</Box>
						<ColorModeSwitch />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
