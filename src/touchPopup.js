const addBackgroundScreen = () => {
		const screen = window.document.createElement( 'div' )
		screen.classList.add( 'wp-dark-screen' )
		document.body.appendChild( screen )
	},

	removeBackgroundScreen = () => {
		const screen = window.document.getElementsByClassName( 'wp-dark-screen' )
		document.body.removeChild( screen[ 0 ] )
	},

	createTouchShow = ( popup, popupEvents ) => {
		const touchShow = ( content ) => {

			popup.innerHTML = content
			popup.style.visibility = 'visible'
			addBackgroundScreen()

			if ( popupEvents.onShow ) {
				popupEvents.onShow( popup )
			}
		}

		return touchShow
	},

	createTouchHide = ( popup, popupEvents ) => {
		const touchHide = () => {
			if ( popupEvents.onHide ) {
				popupEvents.onHide( popup )
			}

			popup.style.visibility = 'hidden'
			removeBackgroundScreen()
		}

		return touchHide
	}

export { createTouchShow, createTouchHide }
