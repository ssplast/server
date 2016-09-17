if (!window.WebSocket) {
    document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.<a href="https://www.google.ru/chrome/browser/desktop/">Современный браузер</a>';
}else{
    // создать подключение
    var socket = new WebSocket('ws://<%= injection.webSocketHost %>');

    socket.onopen = function(event) {
        socket.send('arduino_kub');
        var div = document.createElement('div');
        div.appendChild(document.createTextNode('connection'));
        document.getElementById('info').appendChild(div);
        event.preventDefault();
    };

    // обработчик входящих сообщений
    var info = $('#info');
    var container = $('#kub > .container');
    var arrxyz;
    socket.onmessage = function(event) {
        console.log(event.data);
        arrxyz = event.data.split(" ");
        if (arrxyz.length == 3) {
            info.html(event.data);

            container.css({
                "transform": "rotateX(" + arrxyz[1] + "deg) rotateY(" + arrxyz[0] + "deg) rotateZ(" + arrxyz[2] + "deg)"
            });
        }
        event.preventDefault();
    };

    socket.onerror = function(event) {
        console.log("An error occurred. Sorry for that.");
    };

}

