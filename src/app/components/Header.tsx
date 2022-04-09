import { Box, Square } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineReload, AiOutlineFolderOpen } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export default function Header({ resetAndBack, videoList }) {
	const [rootPath, setRootPath] = useState<string>(localStorage.getItem('rootPath'))
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	function handleRelaunch() {
		window.electronAPI.reloadWindow()
	}
	function setupRootFolder() {
		window.electronAPI.setupRootFolder()
	}

	useEffect(() => {
		window.electronAPI.returnRootPath(function (e, path: string) {
			setRootPath(path)
			localStorage.setItem('rootPath', path)
		})
	}, [])
	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Box display="flex" alignItems="center" onClick={setupRootFolder} cursor="pointer" minH="1.8rem">
				{!isSafetyMode && (
					<>
						<Box p="0.3rem" fontSize="1.2rem">
							<AiOutlineFolderOpen />
						</Box>
						<Box>{rootPath || '未指定根目錄'}</Box>
					</>
				)}
			</Box>

			<Box display="flex" justifyContent="flex-end" alignItems="center">
				{videoList.length >= 1 && (
					<Box p="0.3rem" onClick={() => resetAndBack()} cursor="pointer">
						{isSafetyMode ? '回文章列表' : '回女優列表'}
					</Box>
				)}
				{/* 開發時才打開此功能 */}
				<Box d="block" p="0.3rem" cursor="pointer">
					<Square onClick={handleRelaunch}>
						<AiOutlineReload />
					</Square>
				</Box>
			</Box>
		</Box>
	)
}
