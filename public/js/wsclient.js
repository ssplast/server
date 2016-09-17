if (!window.WebSocket) {
    document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.<a href="https://www.google.ru/chrome/browser/desktop/">Современный браузер</a>';
}
var username = prompt('Имя под которым вы будете учавствовать в чате.', Math.random());


// создать подключение
var socket = new WebSocket('ws://<%= injection.host + ":" + injection.wsPort %>');

socket.onopen = function(event) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode('connection'));
    document.getElementById('subscribe').appendChild(div);
    event.preventDefault();
};


// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
    var outgoingMessage = this.message.value;
    socket.send(username + ' -> ' + outgoingMessage);
    return false;
};
function togglePlay(){document.getElementById('messageIn').play();}
// обработчик входящих сообщений
socket.onmessage = function(event) {
    var incomingMessage = event.data;
    //onclick="togglePlay();"

    togglePlay();
    showMessage(incomingMessage);
    event.preventDefault();
};

// показать сообщение в div#subscribe
function showMessage(message) {
    var messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').insertBefore(messageElem,
        document.getElementById('subscribe').firstChild);
    //document.getElementById('subscribe').appendChild(messageElem);
}
socket.onerror = function(event) {
    console.log("An error occurred. Sorry for that.");
};