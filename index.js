require('./libs/config/config.js');
_.c(
    new Date().toLocaleString() +
    '  Система: ' + process.platform +
    '  Тип: ' + _.os +
    '  Архитектура: ' + process.arch +
    '  Node: ' + process.version +
    '  \nПусковик: ' + process.title +
    '  \nТочки входа: ' + process.argv
);

//require('./gulpfile.js');
//require('./libs/ivona/ivona.js');

require('http').createServer(require(_.path.join(_.libs, 'httpserver','onrequest.js'))).listen(
     _.port, _.ip, function(err){
        if(!err){
            _.c(
                '\nServer start | ip ' + _.ip +
                ' | port ' + _.port +
                ' | sPort ' + _.sPort +
                ' | host ' + _.host
            )
        }
    }
)
/*
.onupgrade = require(_.path.join(_.libs,'wsserver','wsserver.js'));
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', function (err) {
    if (!err) {
        port.on('data', function (data) {
          _.c(data);
            if(data){
                    for(key in _.arduinoClient) {
                        if(_.arduinoClient){
                            _.arduinoClient[key].send(data.toString(), function(error) {
                                _.c('/index.js _.arduinoClient[key].send(data.toString(), function(error)');
                            });
                        }
                    }
                }else{
                    _.c('data not yet');
                }
        });
    }
});





//nvm install 6.5.0
//nvm use 6.5.0
//nvm ls 6.5.0
//nvm alias default 6.5.0
//nvm use default


//ls -la /dev/ttyUSB0
//ls -la /dev/ttyUSB1
//sudo chmod a+rw /dev/ttyUSB0
//sudo chmod a+rw /dev/ttyUSB1
//sudo ln -sf /dev/ttyUSB0 /dev/ttyS0
//sudo chmod o+rw /dev/ttyS0
//echo -ne '\033[2J' > /dev/ttyS1
//cat -v < /dev/ttyS1
//stty -speed 19200 < /dev/ttyS1
//stty -speed 19200 -f /dev/ttyS1
//screen /dev/ttyS1

//sudo apt-get install inetutils-ftpd
//sudo sed 's/^$/ftpd -D/' -i /etc/rc.local


//whereis node
//sudo su


//brackets
//sudo add-apt-repository ppa:webupd8team/brackets
//sudo apt-get update
//sudo apt-get install brackets

//npm install -g node-inspector
//node-debug index.js

//netstat -an | grep ':80'
//ifconfig*/
