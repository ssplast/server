util = require('util');
module.exports = function(data){
    if(typeof data === 'string'
        || typeof data === 'number'
        || typeof data === 'boolean'
        || typeof data === 'undefined'
    ){
        console.error(data);
    }else if(typeof data === 'function'){
        console.error(data.toString());
    }else if(typeof data === 'object'){
        console.error(util.inspect(data, showHidden=0, depth=10, colorize=true));
    }else{
        console.error('------------------------');
        console.error('console.error не отработал');
        console.error(data);
        console.error('-typeof = ' + typeof data + '--------------');
    }
};
