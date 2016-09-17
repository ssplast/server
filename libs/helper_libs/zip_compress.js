var zlib = require('zlib'),
ContentType = {
    ".svg":"image/svg+xml",
    ".js":"text/javascript",
    ".css":"text/css",
    ".html":"text/html",
    ".png":"image/png"
};
module.exports = function(data, req, res, file){
    if(req["accept-encoding"]){
        zlib[req["accept-encoding"]](data, function(err, buffer) {
            if (err) {
                _.cr(err + "\n в файле " + __filenane);
            }else{
                data = buffer;
                res.statusCode = 200;
                res.setHeader('Content-encoding', req["accept-encoding"]);
                res.setHeader('Content-Type', ContentType[_.path.parse(file).ext] + '; charset=utf-8');
                res.setHeader('Content-Length', data.length);
                res.end(data);
                _.c('Отдан файл > ' + file + ' > тип сжатия - ' + req["accept-encoding"]);
            }
        });
    }else{
        res.statusCode = 200;
        res.setHeader('Content-encoding', req["accept-encoding"]);
        res.setHeader('Content-Length', data.length);
        res.end(data);
        _.c('Отдан файл > ' + file + ' > без сжатия');
    }
};
