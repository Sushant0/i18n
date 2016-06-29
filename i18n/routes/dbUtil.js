var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/stringDB';
var client = new pg.Client(connectionString);
// client.connect();

DBUtil = function (){
	// console.log("test successful");
	connectDB();
}

function connectDB(){
	client.connect(function(err){
	  if(err){
	    console.log('Database connection error'+err+connectionString);
	  }else{
	    console.log('Database connection successful'+connectionString);
	  }
	});
}


DBUtil.prototype.search = function (query,callback){
	console.log('hello world');
	callback();
}

DBUtil.prototype.update = function (query,callback){
	console.log('update');
}



var results = [];

var query1 = client.query('CREATE TABLE IF NOT EXISTS list (key text not null, value text not null, type int not null, PRIMARY KEY(key, value))');
query1.on('end', function() {
   console.log("List table successfully created");
});

module.exports = DBUtil;