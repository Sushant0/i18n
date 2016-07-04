var db = require('../lib/dbUtil.js');

require('../Model/stringObject.js');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var ejs = require('ejs');
const path = require('path');

var key = ['Hello','World'];
var value = ['hello_world','World_hello'];
var iosData = '';
var andriodData = '';

var dbUtil = new DBUtil();

var callback = function(result){
	console.log(result);
}


var createIOSFile = function(key, value){

		iosData = '';

			for (var i = 0; i < key.length; i++) {
				iosData += "\""+key[i] + "\" \= \"" + value[i] +"\"\; \n";
			}
			fs.writeFile('helloworld.string', iosData, function (err) {
		  if (err) return console.log(err);
		  console.log('helloworld.string created');
		});
}

var createAndriodFile = function(key, value){

		andriodData = '';

			for (var i = 0; i < key.length; i++) {
				andriodData += "\<"+"string name"+"\="+"\""+key[i] + "\" \>\"" + value[i] + "\"\<\\"+"string"+"\> \; \n";
			}
			fs.writeFile('helloworld.xml', andriodData, function (err) {
		  if (err) return console.log(err);
		  console.log('helloworld.xml created');
		});
}


// createIOSFile(key,value);
// createAndriodFile(key,value);

/* GET home page. */
router.get('/', function(req, res, next) {
	dbUtil.showAll(function(list){ 
		res.render('index.ejs',{ list : list});
	});
});

router.post('/', function(req, res, next) {


		if(req.body.hasOwnProperty('Update')){
			console.log("Update");
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			dbUtil.update(stringObject,function(list){ 
			res.render('index.ejs',{ list : list});
		},dbUtil);
		}
		else if (req.body.hasOwnProperty('Remove')) {
			console.log("remove");
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			dbUtil.remove(stringObject,function(list){ 
			res.render('index.ejs',{ list : list});
		},dbUtil);
		}
});

router.get('/ios', function(req, res, next) {
		console.log(path.join(__dirname) + '/../helloworld.xml');
		// res.send('test');
		res.sendFile(path.join(__dirname) + '/test.xml');
		// res.render('test.xml');
	});

router.post('/search', function(req, res, next){
	console.log("::: in search ::");
   dbUtil.search(req.body.clubname, callback);

});

router.post('/insert', function(req, res, next){
   dbUtil.insertdb(req.body.key, req.body.value);
});


module.exports = router;
