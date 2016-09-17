module.exports = function ScanHttpMapFolder(httpMapFolder){
    return {
        folder: httpMapFolder,
        handlers: getAllHttpHandlers(httpMapFolder)
    }
};

function getAllHttpHandlers(dir, dirMap){
    dirMap = dirMap || {};
    if(dir && (stat = _.fs.lstatSync(dir)) && stat.isDirectory()){
        _.fs.readdirSync(dir).forEach(function(scanItem){
            if(_.fs.lstatSync(_.path.join(dir, scanItem)).isDirectory()){
                dirMap[scanItem] = getAllHttpHandlers(_.path.join(dir, scanItem), new Object(dirMap[scanItem]));
            }else{
                dirMap[scanItem] = require(_.path.join(dir, scanItem));
            }
        });
    }
    return dirMap;
}
