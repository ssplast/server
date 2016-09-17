var resEndCompress = require(_.libs + '/helper_libs/zip_compress.js'),
    file = _.path.join(_.rootDir, '/public/img/favicon.ico');

module.exports = function getFavicon(req, res){
    _.fs.readFile(file, function(err, buf){
        if (!err){
            res.setHeader('Content-Type', 'image/x-icon');
            res.setHeader('Cache-Control', 'public, max-age=' + 1000 * 60 * 60 * 7);
            resEndCompress(buf, req, res, file);
        }else{
            res.statusCode = 404;
            res.end();
            _.cr(err);
        }
    });
};
