const allMessages=[];

const getAllMessages= (req,res,next) => {
	res.send(allMessages)
}

const createMessage = (req,res,next) => {
	let newMessage = req.body
	allMessages.push(newMessage)
	if (!req.session.history) {
		req.session.history = [];
	}
	req.session.history.push(newMessage)
	res.send(allMessages)
}

const history = (req,res,next) => {
	res.send(req.session.history)
}

module.exports={
	getAllMessages,
	createMessage,
	history
}