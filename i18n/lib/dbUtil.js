var pg = require('pg');
var obj = require('../Model/stringObject.js');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/stringDN';
var client = new pg.Client(connectionString);
// client.connect();

DBUtil = function (){
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

DBUtil.prototype.insertdb = function (queryObject,callback){
	var query = client.query("INSERT into list(key, value, \"isAndroid\", \"isIOS\", \"isVerified\") values($1,  $2 ,  $3 ,  $4 ,  $5);",[queryObject.getKey(), queryObject.getValue(), queryObject.getIsAndroid(), queryObject.getIsIOS(), queryObject.getIsVerified()] );
	callback();

}

DBUtil.prototype.showAll = function (user,callback){
	var list = [];
	var query = client.query('SELECT key, value, \"isAndroid\", \"isIOS\", \"isVerified\" FROM list ORDER BY key ASC;');
	query.on('row',function(row){
		var stringObject = new StringObject();
		stringObject.initForDB(row);
		list.push(stringObject);
	});
	query.on('end',function(results){
		callback(list,user);
	});
}

DBUtil.prototype.showAndroidValues = function (callback){
	var list = [];
	var query = client.query("SELECT key, value, \"isAndroid\", \"isIOS\", \"isVerified\" FROM list WHERE \"isAndroid\" is true AND \"isVerified\" is true ORDER BY key ASC;");
	query.on('row',function(row){
		var stringObject = new StringObject();
		stringObject.initForDB(row);
		list.push(stringObject);
	});
	query.on('end',function(results){
		callback(list);
	});
}

DBUtil.prototype.showIosValues = function (callback){
	var list = [];
	var query = client.query("SELECT key, value, \"isAndroid\", \"isIOS\", \"isVerified\" FROM list WHERE \"isIOS\" is true AND \"isVerified\" is true ORDER BY key ASC;");
	query.on('row',function(row){
		var stringObject = new StringObject();
		stringObject.initForDB(row);
		list.push(stringObject);
	});
	query.on('end',function(results){
		callback(list);
	});
}

DBUtil.prototype.update = function (queryObject,callback){
		try{
		var query = client.query("UPDATE list SET value = $1 , \"isIOS\" = $2 , \"isAndroid\" = $3 , \"isVerified\" = $4 where key = $5;",[queryObject.getValue(),queryObject.getIsIOS() ,queryObject.getIsAndroid() , queryObject.getIsVerified() ,queryObject.getKey()]);
		} catch(err){
			console.log(err);
		}
	 query.on('end',function(results){
		callback();
	});
}
var results = [];
var query1 = client.query('CREATE TABLE IF NOT EXISTS list (key text not null, value text not null, \"isAndroid\" boolean, \"isIOS\" boolean,\"isVerified\" boolean,PRIMARY KEY(key))');
query1.on('end', function() {
   console.log("List table successfully created");
});

DBUtil.prototype.remove = function (queryObject,callback){
	try{
			var query = client.query("DELETE FROM list WHERE key = $1;",[queryObject.getKey()]);
			} catch(err){
				console.log(err);
			}
		 query.on('end',function(results){
		 	callback();
		});
}

module.exports = DBUtil;
