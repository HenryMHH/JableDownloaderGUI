import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider resetCSS={true}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
