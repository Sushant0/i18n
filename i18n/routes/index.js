var db = require('../lib/dbUtil.js');

require('../Model/stringObject.js');
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

const path = require('path');
var iosData = '';
var andriodData = '';

var dbUtil = new DBUtil();

var callback = function(result){
}


var createIOSFile = function(){

		fs.writeFile('helloworld.string', "");
console.log("Creating......");
		dbUtil.showIosValues(function(list){ 
				iosData = '';


			list.forEach(function(val){
				iosData += "\""+val.getKey() + "\" \= \"" + val.getValue() +"\"\; \n";
				fs.writeFile('helloworld.string', iosData, function (err) {
		 	    if (err) return console.log(err);
		  		console.log('helloworld.string created');
			});
		});
	});
}
		


var createAndriodFile = function(){

fs.writeFile('helloworld.xml', "");

	dbUtil.showAndroidValues(function(list){ 
				andriodData = '';

			list.forEach(function(val){
				andriodData += "\<"+"string name"+"\="+"\""+val.getKey() + "\" \>\"" + val.getValue() + "\"\<\\"+"string"+"\> \n";
				fs.writeFile('helloworld.xml', andriodData, function (err) {
		 	    if (err) return console.log(err);
		  		console.log('helloworld.xml created');
			});
		});
	});
}


/* GET home page. */
router.get('/', function(req, res, next) {
	dbUtil.showAll(function(list){ 
		res.render('index.ejs',{ list : list});
	});
});

router.post('/', function(req, res, next) {


		if(req.body.hasOwnProperty('Update')){
			console.log("Update",req.body);
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
		res.sendFile(path.join(__dirname) + '/test.xml');
	});

router.post('/search', function(req, res, next){
   dbUtil.search(req.body.clubname, callback);

});

router.post('/insert', function(req, res, next){
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			if(stringObject.getValue()==""|| stringObject.getKey()=="")
			{

			}
			else{
					dbUtil.insertdb(stringObject,function(list){ 
			res.render('index.ejs',{ list : list});
		},dbUtil);
			}
		
});

router.get('/generateIos', function(req, res, next) {
	
		createIOSFile();


});
router.get('/generateAndroid', function(req, res, next) {
	
		createAndriodFile();


});





module.exports = router;
