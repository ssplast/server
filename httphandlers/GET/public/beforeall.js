var resEndCompress = require(_.libs + 'helper_libs/zip_compress.js');
var mycall = function(err, buf, req, res){
    if (!err){
        if(['.js', '.html', '.ejs', '.css'].indexOf(_.path.parse(req.url).ext) >= 0){
            buf = _.ejs.render(buf.toString('utf8'),
                {
                    injection:{
                        "httpHost": _.config.httpHost,
                        "webSocketHost": _.config.webSocketHost
                    }

                }
            );
            console.log('ejs.render файла > ' + _.path.join(_.rootDir, req.url));
        }
        resEndCompress(buf, req, res, _.path.join(_.rootDir, req.url));
    }else{
        res.statusCode = 404;
        res.end();
        console.warn('Обращение к несуществующей странице > ' + err);
    }
};
module.exports = function(req, res){
    console.log(_.path.join(_.rootDir, req.url));
    _.fs.readFile(_.path.join(_.rootDir, req.url), function(err, buf){
        if (err) {
            mycall('no file in derictory ' + _.path.join(_.rootDir, req.url), null, req, res);
        }else{
            mycall(null, buf, req, res);
        }
    });
};
