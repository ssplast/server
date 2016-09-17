module.exports = function onRequest(req, res){

   reqinfo = {
        ip: (req.headers["x-forwarded-for"] || req.connection.remoteAddress),
        url: req.url,
        method: req.method,
        host: req.headers.host,
        referer: req.headers.referer,
        cookie: req.headers.cookie,
        agent: req.headers['user-agent'],
        nat: req.connection['_peername'],
        "accept-encoding": req.headers["accept-encoding"] ?
        req.headers["accept-encoding"].match(/\bgzip\b/)?'gzip':req.headers["accept-encoding"].match(/\bdeflate\b/)?'deflate': false : false
    };
    _.c(
        '\nrequest - ' +
        new Date().toLocaleString() + '   ' +
        reqinfo.method + '   ' +
        reqinfo.host + '   ' + reqinfo.ip + '   ' +
        reqinfo.url
    );
    //_.c(reqinfo);//12321321321321321321
    require(_.path.join(_.libs, 'httpserver','getcurrreqhandlers.js'))(reqinfo).forEach(function(func){
        func(reqinfo, res);
    });

};
