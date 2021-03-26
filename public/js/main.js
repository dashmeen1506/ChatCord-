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
    let div = document.createElement('div')
    let className = type
    div.classList.add(className, 'message')

    let container = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    div.innerHTML = container 
    messageArea.appendChild(div)
}


socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
})