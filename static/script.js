let chats = []
let currentChat = -1

function newChat(){

document.getElementById("chat-box").innerHTML = ""

currentChat = chats.length

chats.push("")

createHistoryItem(currentChat)

}

function createHistoryItem(index){

let historyList = document.getElementById("history-list")

let item = document.createElement("div")

item.className = "history-item"

item.innerText = "Chat " + (index+1)

item.onclick = function(){

currentChat = index

document.getElementById("chat-box").innerHTML = chats[index]

}

historyList.appendChild(item)

}

async function sendMessage(){

let input = document.getElementById("user-input")
let message = input.value

if(message.trim()==="") return

if(currentChat === -1){
newChat()
}

let chatBox = document.getElementById("chat-box")

chatBox.innerHTML += `<div class="user"><b>You:</b> ${message}</div>`

input.value=""

const response = await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:message})
})

const data = await response.json()

chatBox.innerHTML += `<div class="bot"><b>Bot:</b> ${data.reply}</div>`

chatBox.scrollTop = chatBox.scrollHeight

chats[currentChat] = chatBox.innerHTML

}