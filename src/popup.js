import { createHoverShow, createHoverHide } from './hoverPopup'
import { createTouchShow, createTouchHide } from './touchPopup'
import '../style/popup.less'

let popup

const createPopup = ( container, isTouch, win = window ) => {
	if ( !popup ) {
		popup = win.document.createElement( 'div' )
		popup.setAttribute( 'dir', 'ltr' )
		if ( isTouch ) {
			popup.classList.add( 'wp-touch-popup' )
		} else {
			popup.classList.add( 'wp-hover-popup' )
		}
		popup.style.visibility = 'hidden'
		container.appendChild( popup )
	}

	const popupEvents = {/* onShow, onHide */},

		show = isTouch ?
			createTouchShow( popup, popupEvents ) :
			createHoverShow( popup, popupEvents, win ),

		hide = isTouch ?
			createTouchHide( popup, popupEvents ) :
			createHoverHide( popup, popupEvents, win ),

		subscribe = ( events = {} ) => {
			if ( events.onShow ) {
				popupEvents.onShow = events.onShow
			}
			if ( events.onHide ) {
				popupEvents.onHide = events.onHide
			}
		}

	return { show, hide, subscribe, element: popup }
}

export { createPopup }
