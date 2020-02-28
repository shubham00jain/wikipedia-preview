
export const isTouch = () => {
	return 'ontouchstart' in window
}

const matches = Element.prototype.matches ||
	Element.prototype.msMatchesSelector ||
	Element.prototype.webkitMatchesSelector

export const matchesSelector = (element, selector) => {
	return matches.call(element, selector)
}
