require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const session = require('express-session')
const app = express();
const ctrl = require('./messagesCtrl')

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


app.use(json())

app.use((req, res, next) => {
	let badWords = ["knucklehead", "jerk", "internet explorer"];
	if (req.body.message) {
		let badWordsExist = true;
		for (let i = 0; i < badWords.length; i++) {
			let regex = new RegExp(badWords[i], "g");
			req.body.message = req.body.message.replace(regex, "****");
		}
		next();
	} else {
		next();
	}
});


app.get('/api/messages', ctrl.getAllMessages)
app.post('/api/messages', ctrl.createMessage)
app.get('/api/messages/history', ctrl.history)

app.listen(process.env.SERVER_PORT, console.log(`listening on port ${process.env.SERVER_PORT}`))