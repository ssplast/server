//замена подстрок нумерация строк
/*
var fs = require('fs');
var file = fs.readFileSync("index.html", "utf8");
var i = 1;
file = file.replace(/id="\d+">\d+/gi, function(){
//file = file.replace(/str_id_/gi, function(){
    return '>';
    //return 'id="' + i + '">' + i++;// + i++;
});
console.log(file);
    */