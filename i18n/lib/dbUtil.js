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

DBUtil.prototype.search = function (query1,callback){

	var query = client.query("SELECT key FROM list WHERE value = $1 ", [query1]);
    var rows = [];
    query.on('row', function(row, res) {
    rows.push(row);
    callback(row.key)

	});
}

DBUtil.prototype.insertdb = function (key,value){
	var query = client.query("INSERT into list (key, value, type) VALUES ($1, $2, $3) ", [key, value,1]);
}

DBUtil.prototype.showAll = function (callback){
	var list = [];
	var query = client.query('SELECT * FROM list ORDER BY key ASC;');
	query.on('row',function(row){
		var stringObject = new StringObject();
		stringObject.initForDB(row);
		list.push(stringObject);
	});
	query.on('end',function(results){
		callback(list);
	});

	// console.log('showAll'+obj.getKey());
}

DBUtil.prototype.update = function (queryObject,callback,dbUtil){
		try{
		var query = client.query("UPDATE list SET value = $1 , \"isIOS\" = $2 , \"isAndriod\" = $3 , \"isVerified\" = $4 where key = $5;",[queryObject.getValue(),queryObject.getIsIOS() ,queryObject.getIsAndriod() , queryObject.getIsVerified() ,queryObject.getKey()]);
		} catch(err){
			console.log(err);
		}	
	//  var query = client.query("SELECT key FROM list WHERE value = $1;"[queryObject.getValue()]);
	 query.on('end',function(results){
	 	dbUtil.showAll(callback);
	});
}
var results = [];
var query1 = client.query('CREATE TABLE IF NOT EXISTS list (key text not null, value text not null, type int not null, PRIMARY KEY(key, value))');
query1.on('end', function() {
   console.log("List table successfully created");
});

DBUtil.prototype.remove = function (queryObject,callback,dbUtil){
	try{
			var query = client.query("DELETE FROM list WHERE key = $1;",[queryObject.getKey()]);
			} catch(err){
				console.log(err);
			}	
		//  var query = client.query("SELECT key FROM list WHERE value = $1;"[queryObject.getValue()]);
		 query.on('end',function(results){
		 	dbUtil.showAll(callback);
		});
}

module.exports = DBUtil;