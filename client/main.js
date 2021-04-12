const newLocal = 'http://192.168.1.67:6677';
var socket= io.connect(newLocal,{'forceNew':true});
socket.on('message', function (data) {
    console.log(data);
    render(data);
})
function render(data) {
    let html= data.map(function (message, index) {
        return (`
        <div class='message'>
                <strong>${message.nickname}</strong>
                <span>${message.text}</span>
        </div>
        `);
    }).join ('');
    let div_msg =document.getElementById('message');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}
function addMessage(e){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
 
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
 
    return false;
}