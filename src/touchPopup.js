
let popup

const createTouchPopup = (container, win=window) => {
	if (!popup) {
		popup = win.document.createElement('div')
		popup.setAttribute('dir', 'ltr')
		popup.classList.add('wp-touch-popup')
		popup.style.visibility = 'hidden'
		container.appendChild(popup)
	}

	const show = (content) => {
		popup.innerHTML = content
		popup.style.visibility = 'visible'
	}

	const hide = () => {
		popup.style.visibility = 'hidden'
	}

	return { show, hide }
}

export { createTouchPopup }
