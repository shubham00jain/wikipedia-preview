const fs = require('fs');
const allMessages = require('./i18n/qqq.json')
var files = fs.readdirSync('./i18n/')
Object.keys(allMessages).forEach(k => { allMessages[k] = {}})
files.forEach(filename => {
	if (filename.startsWith('qqq')) {
		return
	}
	var messages = require('./i18n/' + filename)
	var lang = filename.substr(0, filename.indexOf('.'))
	Object.keys(messages).forEach(message => {
		if (message === '@metadata') {
			return
		}
		allMessages[message][lang] = messages[message]
	})
})

console.log(JSON.stringify(allMessages, null, 4))
