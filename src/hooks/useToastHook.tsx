import { useToast, UseToastOptions } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const initialState = { status: '', msg: '' }

const toastSuccess: UseToastOptions = { title: 'Success', status: 'success', duration: null, isClosable: true, position: 'bottom-right' }
const toastError: UseToastOptions = { title: 'Error', status: 'error', duration: null, isClosable: true, position: 'bottom-right' }

export default function useToastHook() {
	const [tip, setTip] = useState(initialState)
	const toast = useToast()
	useEffect(() => {
		if (tip.status === 'success') {
			toast({ ...toastSuccess, description: tip.msg })
		}
		if (tip.status === 'error') {
			toast({ ...toastError, description: tip.msg })
		}
	}, [tip])
	return { setTip }
}
