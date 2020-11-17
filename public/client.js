
const socket = io()

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let buttonPress = document.querySelector("#send-button");
let name;
do{
	name = prompt('please enter your name??');
}while(!name)

textarea.addEventListener('keyup',(e)=>{
	if(e.key === 'Enter'){
		sendMessage(e.target.value);
		console.log(e.target.value);
	}
});

function sendMessage(message){
	let msg = {
		user:name,
		message:message.trim()
	}
	// Append
	appendMessage(msg, 'outgoing')
	// send to server
	socket.emit('message',msg);
}

function appendMessage(msg,type){
	let mainDiv = document.createElement('div');
	let className = type
	mainDiv.classList.add(className,'message');
	messageArea.appendChild(mainDiv)
	let markup = `
	<h4>${msg.user}</h4>
	<h1>${msg.message}</h1>
	`
	mainDiv.innerHTML = markup

	
}

socket.on('message',(msg)=>{
	appendMessage(msg,'incoming');
})


