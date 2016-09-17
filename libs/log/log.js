module.exports = function logAppendFile(data, logFile){
    if(data && logFile){
        _.fs.appendFile(logFile, data + '\r\n', 'utf8', function(err){
            if (err) throw err;
        });
    }else{
        if(!data && !logFile){
            _.cw('_.log вызван без аргументов.');
        }else{
            if(!data || !logFile){
                data?_.cw('_.log вызван без аргумена имени файла записи !!!.'):
                    _.cw('_.log вызван без аргумена, нет данных на запись !!!');
            }
        }
    }

};