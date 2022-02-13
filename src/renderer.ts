const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title') as HTMLInputElement
const target = document.getElementById('target')
setButton.addEventListener('click', () => {
	const title = titleInput.value
	window['electronAPI'].setTitle(title)
	window['electronAPI'].fetchData('fewmiofjew')
	window['electronAPI'].cool((e, value) => {
		// target.innerHTML = value
	})
})
