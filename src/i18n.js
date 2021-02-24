import messages from '../i18n/allmessages.json'

const msg = ( lang, key, ...params ) => {
	let message = messages[ key ][ lang ] || messages[ key ].en || key
	params.forEach( ( param, i ) => {
		message = message.replace( new RegExp( `\\$${i + 1}`, 'g' ), param )
	} )
	return message
}

export { msg }
