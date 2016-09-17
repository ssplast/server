var pathTemplate,
    resEndCompress = require(_.path.join(_.libs, 'helper_libs', 'zip_compress.js'));

module.exports = function (req,res){
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=' + 1000);

    pathTemplate = _.path.join(_.template, 'chat', 'index.html');

    _.fs.readFile(pathTemplate, 'utf8', function(err, data){
        if(!err){
            data = _.ejs.render(data,{
                injection: {
                    title:'chat',
                    httpHost:_.host
                }
            });
            _.c('ejs.render файла > ' + pathTemplate);
            resEndCompress(data, req, res, pathTemplate);
        }else{
            res.statusCode = 404;
            res.end('error');
        }
    });


};
