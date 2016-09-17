var wsServer = require('ws').Server({port : _.sPort}, function(err){
    if(err){
        _.cr('Web Socet не удалось запустить.');
    }
}),
    wsClients = {};

wsServer.on('connection', function(ws) {
    var id = Math.random();
    wsClients[id] = ws;
    for(var key in wsClients) {
        if(wsClients[key] == ws){
            ws.send("id " + id, function(error){_.cr('wsServer.on ws.send connection error')});
        }else{
            wsClients[key].send("Client " + id + " connected", function(error){_.cr('wsServer.on wsClients[key] connection error')});
        }
        wsClients[key].send("Count clients is " + Object.keys(wsClients).length, function(error){_.cr('wsServer.on wsClients[key] last connection error')});
    }

    ws.on('message', function(message) {
        //console.log(message);
        if(message == 'arduino_kub'){
            for(key in wsClients) {
                if(wsClients[key] == ws){
                    _.arduinoClient[key] = ws;
                }
            }
        }else{
            for(key in wsClients) {
                if(wsClients[key] == ws){
                    ws.send('-> ' + message, function(error){_.cr(error)});
                }else{
                    wsClients[key].send(message, function(error){_.cr(error)});
                }
            }
        }
    });

    ws.on('close', function() {
        delete wsClients[id];
        //delete _.arduinoClient[id];
        console.log(id);
        if(wsClients){
            for(key in wsClients) {
                wsClients[key].send("Client disconnected " + id +
                    " Count clients is " + Object.keys(wsClients).length

                , function(error){_.cr('ws.on close error')});

            }
        }
    });

    ws.on('error', function(er) {
        _.cr(er);
    })

});


module.exports = function onUpgrade(request, socket) {
    var key = request.headers['sec-websocket-key'];
    key = require('crypto').createHash('sha1').update(key+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest('base64');

    var sResponse = "HTTP/1.1 101 Switching Protocols\r\n" +
        "Upgrade: websocket\r\n" + "Connection: Upgrade\r\n" +
        "Sec-WebSocket-Accept: " + key + "\r\n\r\n";
    socket.write(sResponse,'ascii');

};
