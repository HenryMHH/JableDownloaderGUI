import { Box, Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Box display="flex" position="absolute" alignItems="center" right="1rem">
			{colorMode === 'light' ? '淺色模式' : '深色模式'}
			<Box display="flex" alignItems="center" pl={colorMode === 'dark' ? '2rem' : '1rem'} pr={colorMode === 'light' ? '1rem' : ''}>
				{colorMode === 'light' && <FaSun />}
				<Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} px="4px" />
				{colorMode === 'dark' && <FaMoon />}
			</Box>
		</Box>
	)
}
