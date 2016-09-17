var address, before, after,
    allHandlers = require('./getAllHttpHandlers.js')(_.path.join(_.rootDir, 'httphandlers')).handlers;

module.exports = function (req){
    address = '[\'' + req.method + '\']';
    before = [];
    after = [];
    _.url.parse(req.url, true, true).pathname.split('/').forEach(function(step){
        if(!step) return;
        scanBF = new Function("h", 'try{return h' + address + ';}catch(err){return false;}')(allHandlers);
        address += '[\'' + step + '\']';

        if(scanBF){
            if('beforeall.js' in scanBF){
                before.push(scanBF['beforeall.js']);
            }
            if('afterall.js' in scanBF){
                after.push(scanBF['afterall.js']);
            }
        }
    });


    address = new Function("h", 'try{return h' + address + '[\'index.js\'];}catch(err){return false;}')(allHandlers);
    if(address){
        before = before.concat(address).concat(after);
    }
    if(before.length !== 0)return before;
    _.cr('ни один обработчик не найден!');
    return [function (req, res){
        res.statusCode = 404;
        res.end('Not Found!!!');
    }];
};
