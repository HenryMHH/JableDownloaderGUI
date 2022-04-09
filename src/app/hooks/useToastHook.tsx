import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const initialState = { status: '', msg: '' }

const toastSuccess: UseToastOptions = { title: 'Success', status: 'success', duration: null, isClosable: true, position: 'bottom-right' }
const toastError: UseToastOptions = { title: 'Error', status: 'error', duration: null, isClosable: true, position: 'bottom-right' }

export default function useToastHook() {
	const [tip, setTip] = useState(initialState)
	const isSafetyMode = useSelector((state) => state['safetyModeState'])
	const toast = useToast()
	useEffect(() => {
		if (tip.status === 'success') {
			toast({ ...toastSuccess, description: isSafetyMode ? tip.msg.replace('下載', '學習') : tip.msg })
		}
		if (tip.status === 'error') {
			toast({ ...toastError, description: isSafetyMode ? tip.msg.replace('下載', '學習') : tip.msg })
		}
	}, [tip])
	return { setTip }
}
