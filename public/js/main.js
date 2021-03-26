const socket = io();
let name;
let text = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area');

while( !name )
{
    name = prompt('Enter your name: ');
}    
text.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
        text.value="";
    }
})

sendMessage =(message)=>{
    let msg = {
        user:name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing');
    text.value="";
    socket.emit('message',msg);
}
function appendMessage(msg,type)
{
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
})