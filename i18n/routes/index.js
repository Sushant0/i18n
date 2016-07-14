var db = require('../lib/dbUtil.js');

require('../Model/stringObject.js');
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

const path = require('path');
const iosFile = 'Localizable.string';
const andriodFile = 'Localizable.xml';

var iosData = '';
var andriodData = '';

var dbUtil = new DBUtil();

var callback = function(result){
}


var createIOSFile = function(downloadBlock){

		fs.writeFile(iosFile, "");
		dbUtil.showIosValues(function(list){
				iosData = '';

			list.forEach(function(val){
				iosData += "\""+val.getKey() + "\" \= \"" + val.getValue() +"\"\; \n";
				fs.writeFile(iosFile, iosData, function (err) {
		 	    if (err) return console.log(err);
		  		console.log(iosFile + ' created');
					downloadBlock();
			});
		});
	});

}



var createAndriodFile = function(downloadBlock){

	fs.writeFile(andriodFile, "");
	dbUtil.showAndroidValues(function(list){
				andriodData = '';

			list.forEach(function(val){
				andriodData += "\<"+"string name"+"\="+"\""+val.getKey() + "\" \>\"" + val.getValue() + "\"\<\\"+"string"+"\> \n";
				fs.writeFile(andriodFile, andriodData, function (err) {
		 	    if (err) return console.log(err);
		  		console.log(andriodFile + ' created');
					downloadBlock();
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

		var downloadBlock = function(){
			res.download(iosFile, function(err){
		  if (err) {
		    console.log(err);
		  } else {
				console.log('success');
		  }
		});
	};

	createIOSFile(downloadBlock);

});

router.get('/generateAndroid', function(req, res, next) {


		var downloadBlock = function(){
			res.download(andriodFile, function(err){
			if (err) {
				console.log(err);
			} else {
				console.log('success');
			}
		});
		};

		createAndriodFile(downloadBlock);

});





module.exports = router;
