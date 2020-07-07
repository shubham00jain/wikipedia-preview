export const customEvents = popup => {

	const onMouseLeave = e => {
			const toElement = e.toElement || e.relatedTarget || e.target
			if ( toElement !== popup.element.currentTargetElement &&
			!popup.element.contains( toElement ) ) {
				// console.log( 'event.js - onMouseLeave - toElement...', toElement )
				// console.log( 'event.js - onMouseLeave - toElement.id...', toElement.id )
				// console.log( 'event.js - onMouseLeave - popup...', popup )
				if ( toElement.id === 'one' ) {
					console.log( 'event.js - onMouseLeave - setTimeout 200ms...' )
					setTimeout( popup.hide, 200 )
				} else if ( toElement.id === 'two' ) {
					console.log( 'event.js - onMouseLeave - setTimeout 250ms...' )
					setTimeout( popup.hide, 250 )
				} else if ( toElement.id === 'three' ) {
					console.log( 'event.js - onMouseLeave - setTimeout 300ms...' )
					setTimeout( popup.hide, 300 )
				} else if ( toElement.id === 'four' ) {
					console.log( 'event.js - onMouseLeave - setTimeout 350ms...' )
					setTimeout( popup.hide, 350 )
				} else if ( toElement.id === 'five' ) {
					console.log( 'event.js - onMouseLeave - setTimeout 400ms...' )
					setTimeout( popup.hide, 400 )
				} else {
					console.log( 'event.js - onMouseLeave - no timeout...' )
					popup.hide()
				}
			}
		},

		onExpand = () => {
			popup.element.component.wikipediapreviews.classList.add( 'expanded' )
		},
		onHide = element => {
			element.component.closeBtn.removeEventListener( 'click', popup.hide )
			element.component.readMore.removeEventListener( 'click', onExpand )

			element.removeEventListener( 'mouseleave', onMouseLeave )
			element.currentTargetElement.removeEventListener( 'mouseleave', onMouseLeave )
		},

		onShow = element => {
			element.component = {
				wikipediapreviews: element.querySelector( '.wikipediapreviews' ),
				closeBtn: element.querySelector( '.wikipediapreviews-header-closebtn' ),
				readMore: element.querySelector( '.wikipediapreviews-footer-cta-readmore' ),
				content: element.querySelector( '.wikipediapreviews-body > p' )
			}

			// @todo update the magic number
			if ( element.component.content.getBoundingClientRect().height < 248 ) {
				onExpand( element )
			}

			element.component.closeBtn.addEventListener( 'click', popup.hide )
			element.component.readMore.addEventListener( 'click', onExpand )

			element.addEventListener( 'mouseleave', onMouseLeave )
			element.currentTargetElement.addEventListener( 'mouseleave', onMouseLeave )
		}

	return { onHide, onShow, onExpand }
}
