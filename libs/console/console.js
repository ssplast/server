util = require('util');
module.exports = function(data){
    if(typeof data === 'string'
        || typeof data === 'number'
        || typeof data === 'boolean'
        || typeof data === 'undefined'
    ){
        console.log(data);
    }else if(typeof data === 'function'){
        console.log(data.toString());
    }else if(typeof data === 'object'){
        console.log(util.inspect(data, showHidden=0, depth=10, colorize=true));
    }else{
        console.log('------------------------');
        console.log('console.log не отработал');
        console.log(data);
        console.log('-typeof = ' + typeof data + '--------------');
    }
};
