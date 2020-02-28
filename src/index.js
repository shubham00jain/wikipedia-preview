import { fetchPagePreview } from './api'
import { createPopup } from './popup'
import { createTouchPopup } from './touchPopup'
import { renderPreview } from './preview'
import { isTouch, matchesSelector } from './utils'
import '../style/popup.less'

function init({root, selector, lang, popupContainer}={}) {
	const globalLang = lang || 'en'
	root = root || document
	selector = selector || '[data-wikipedia-preview]'
	popupContainer = popupContainer || document.body

	const popup = isTouch() ?
		createTouchPopup(popupContainer) :
		createPopup(popupContainer)

	const triggerPopup = ({ target }) => {
		const title = target.getAttribute('data-wp-title') || target.textContent
		const lang = target.getAttribute('data-wp-lang') || globalLang
		fetchPagePreview(lang, title).then(data => {
			if (data) {
				popup.show(renderPreview(lang, data), target)
			}
		})
	}

	if (isTouch()) {
		root.addEventListener('touchstart', ({target}) => {
			if (matchesSelector(target, selector)) {
				triggerPopup({target})
			} else {
				popup.hide()
			}
		})
	} else {
		Array.prototype.forEach.call(
			root.querySelectorAll(selector),
			function (node) {
				node.addEventListener('mouseenter', triggerPopup)
			}
		)
	}
}

export { init }
