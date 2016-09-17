mysql = require('mysql');
module.exports.master = mysql.createPool({
    connectionLimit : 1,
    connectTimeout: 20000,

    waitForConnections: true,
    queueLimit: 200,
    acquireTimeout: 500,// висеть в очереди

    host:'localhost',
    user:'root',
    password:'455544',
    database:'mydb',
    debug:false
});
module.exports.user = mysql.createPool({
    connectionLimit : 500,
    connectTimeout: 10000,

    waitForConnections: true,
    queueLimit: 500,
    acquireTimeout: 5000,// висеть в очереди

    host:'localhost',
    user:'user',
    password:'566655',
    database:'mydb',
    debug:false
});
mysqlUser.getConnection(function(err, conn) {
    if(!err){
        conn.query('SELECT * FROM `user`', function(err, rows) {
            if (!err) {
                console.log(conn.threadId);
                console.log(rows);
            }else{
                console.log(err.code);//throw err;
            }
        });
        conn.release();
    }else{
        console.log(err.code);
    }

});
mysqlMaster.getConnection(function(err, conn) {
    if(!err){
        conn.query('SELECT * FROM `user`', function(err, rows) {
            if (!err) {
                console.log(conn.threadId);
                console.log(rows);
                //console.log(Array.isArray(rows));
            }else{
                console.log(err.code);//throw err;
            }
        });
        conn.release();
    }else{
        console.log(err.code);
    }
});