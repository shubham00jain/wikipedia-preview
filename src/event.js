import { isTouch } from './utils'
import { getGalleryRow } from './gallery'
import { requestPageMedia } from './api'

export const customEvents = popup => {

	let eventListenerStack = [],
		timeoutStack = []

	const addTimeout = ( func, timeout ) => {
			const id = setTimeout( func, timeout )
			timeoutStack.push( id )
			return id
		},

		clearAllTimeout = () => {
			timeoutStack.forEach( timeoutId => {
				clearTimeout( timeoutId )
			} )
			timeoutStack = []
		},

		addEventListener = ( target, type, listener, options = undefined ) => {
			target.addEventListener( type, listener, options )
			eventListenerStack.push( [ target, type, listener, options ] )
		},

		clearAllEventListener = () => {
			eventListenerStack.forEach( eventListener => {
				const [ target, type, listener, options ] = eventListener
				target.removeEventListener( type, listener, options )
			} )
			eventListenerStack = []
		},

		onMouseLeave = e => {
			const toElement = e.toElement || e.relatedTarget || e.target,
				previewElement = popup.element.currentTargetElement

			if ( toElement !== previewElement && !popup.element.contains( toElement ) ) {
				let timeoutId
				const persistPopup = () => {
					clearTimeout( timeoutId )
				}

				timeoutId = addTimeout( popup.hide, 300 )
				addEventListener( popup.element, 'mouseenter', persistPopup )
			}
		},

		onExpand = () => {
			popup.element.component.body.style.removeProperty( 'max-height' )
			popup.element.component.wikipediapreview.classList.add( 'expanded' )

			const lang = popup.lang,
				title = popup.title

			if ( lang && title ) {
				requestPageMedia( lang, title, mediaData => {
					if ( mediaData && mediaData.length > 0 ) {
						const galleryContainer = popup.element.querySelector( '.wikipediapreview-gallery' )
						galleryContainer.appendChild( getGalleryRow( mediaData, popup ) )
					}
				} )
			}

			// drag event onExpan
			// addEventListener
			let temp = {
				screenY: null,
				targetScreenY: null,
				originalHeight: null,
				currentHeight: null
			}
			addEventListener( popup.element.component.header, 'touchstart', e => {
				temp.screenY = e.touches[ 0 ].clientY
				temp.targetScreenY = null
				popup.element.component.body.style.transition = ''
				temp.originalHeight = parseInt(
					window.getComputedStyle( popup.element.component.body ).height )
				temp.currentHeight = parseInt(
					window.getComputedStyle( popup.element.component.body ).height )
			} )
			addEventListener( popup.element.component.header, 'touchmove', e => {
				const clientY = e.touches[ 0 ].clientY,
					offset = temp.screenY - clientY
				temp.targetScreenY = clientY
				temp.currentHeight = temp.originalHeight + offset
				console.log( 'current taget', offset ) // eslint-disable-line
				popup.element.component.body.style.height = temp.currentHeight + 'px'
			} )
			addEventListener( popup.element.component.header, 'touchend', () => {
				popup.element.component.body.style.transition = 'height 125ms ease-in, max-height 125ms ease-in'

				const diff = temp.originalHeight - temp.currentHeight
				if ( ( diff / temp.originalHeight ) > 0.4 ) {
					popup.element.component.body.style.height = '0px'
					setTimeout( popup.hide, 150 )
				} else {
					popup.element.component.body.style.height = temp.originalHeight + 'px'
				}
			} )
		},

		onTouchOutsidePreview = e => {
			const toElement = e.target,
				fullscreenGallery = popup.element.querySelector( '.wp-gallery-popup' )

			if ( !popup.element.contains( toElement ) && !fullscreenGallery ) {
				popup.hide()
			}
		},

		onHide = () => {
			popup.element.component.wikipediapreview.classList.remove( 'expanded' )
			popup.lang = null
			popup.title = null
			popup.loading = false

			clearAllEventListener()
			clearAllTimeout()
		},

		onShow = element => {
			element.component = {
				wikipediapreview: element.querySelector( '.wikipediapreview' ),
				wikipediapreviewGallery: element.querySelector( '.wikipediapreview-gallery' ),
				closeBtn: element.querySelector( '.wikipediapreview-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreview-footer-cta-readmore' ),
				header: element.querySelector( '.wikipediapreview-header' ),
				body: element.querySelector( '.wikipediapreview-body' ),
				content: element.querySelector( '.wikipediapreview-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content &&
				element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			// drag event onExpan
			// addEventListener
			let temp = {
				activate: false,
				screenY: null,
				targetScreenY: null,
				originalHeight: null,
				currentHeight: null
			}
			addEventListener( element.component.wikipediapreview, 'touchstart', e => {
				if ( temp.activate ) {
					return
				}
				temp.screenY = e.touches[ 0 ].clientY
				temp.targetScreenY = null
				element.component.body.style.transition = ''
				temp.originalHeight = parseInt(
					window.getComputedStyle( element.component.body ).maxHeight )
				temp.currentHeight = parseInt(
					window.getComputedStyle( element.component.body ).maxHeight )
			} )
			addEventListener( element.component.wikipediapreview, 'touchmove', e => {
				if ( temp.activate ) {
					return
				}
				const clientY = e.touches[ 0 ].clientY,
					offset = temp.screenY - clientY
				temp.targetScreenY = clientY
				temp.currentHeight = temp.originalHeight + offset
				console.log( 'current taget', offset ) // eslint-disable-line
				element.component.body.style.maxHeight = temp.currentHeight + 'px'
			} )
			addEventListener( element.component.wikipediapreview, 'touchend', () => {
				if ( temp.activate ) {
					return
				}
				element.component.body.style.transition = 'max-height 125ms ease-in'

				const diff = temp.currentHeight - temp.originalHeight
				if ( ( diff / temp.originalHeight ) > 0.4 ) {
					onExpand()
					temp.activate = true
				} else {
					element.component.body.style.maxHeight = temp.originalHeight + 'px'
				}
			} )

			addEventListener( element.component.closeBtn, 'click', popup.hide )
			if ( element.component.readMore ) {
				addEventListener( element.component.readMore, 'click', onExpand )
			}

			if ( isTouch ) {
				addEventListener( document, 'touchstart', onTouchOutsidePreview, true )
			} else {
				addEventListener( element, 'mouseleave', onMouseLeave )
				addEventListener( element.currentTargetElement, 'mouseleave', onMouseLeave )
			}
		}

	return { onHide, onShow, onExpand }
}
