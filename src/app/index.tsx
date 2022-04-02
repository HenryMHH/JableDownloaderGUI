import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from '../store/store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider resetCSS={true}>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
