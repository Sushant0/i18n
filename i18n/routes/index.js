var db = require('../lib/dbUtil.js');

require('../Model/stringObject.js');
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');
var passport = require('passport');

const path = require('path');
const iosFile = 'Localizable.string';
const andriodFile = 'Localizable.xml';

var iosData = '';
var andriodData = '';

var dbUtil = new DBUtil();
var createIOSFile = function(downloadBlock){

		fs.writeFile(iosFile, "");
		dbUtil.showIosValues(function(list){
				iosData = '';
			list.forEach(function(val){
				iosData += "\""+val.getKey() + "\" \= \"" + val.getValue() +"\"\; \n";
			});
			
			fs.writeFile(iosFile, iosData, function (err) {
				if (err) return console.log(err);
				// console.log(iosFile + ' created');
				downloadBlock();
		});
	});
}

var createAndroidFile = function(downloadBlock){

	fs.writeFile(andriodFile, "");
		dbUtil.showAndroidValues(function(list){

					andriodData =	'<?xml version="1.0" encoding="utf-8"?> \n<resources>\n';
				list.forEach(function(val){
					andriodData += "	\<"+"string name"+"\="+"\""+val.getKey() + "\"\>"+val.getValue()+"</"+"string"+"\> \n";
			});

			andriodData += '\n</resources>';
			fs.writeFile(andriodFile, andriodData, function (err) {
				if (err) return console.log(err);
				console.log(andriodFile + ' created');
				downloadBlock();
		});
	});
}

// route middleware to make sure a user is logged in

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req._passport.session.user.domain === 'freshdesk.com')
        return next();

    // if they aren't redirect them to the home page
    console.log("login fail");
    res.redirect('/login');
}

router.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

	// the callback after google has authenticated the user
  router.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/test' }),
  function(req, res) {
  res.redirect('/');
  });

/* GET home page. */

router.get('/',isLoggedIn, function(req, res, next) {
	dbUtil.showAll(req._passport.session.user,function(list,user){
		res.render('index.ejs',{ list : list , user : user});
	});
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

router.post('/post',isLoggedIn, function(req, res, next) {

		if(req.body.hasOwnProperty('Update')){
			console.log("Update",req.body);
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			dbUtil.update(stringObject,function (){
        res.redirect('/');
      });
		}
		else if (req.body.hasOwnProperty('Remove')) {
			console.log("remove");
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			dbUtil.remove(stringObject,function (){
        res.redirect('/');
      });
		}
});

router.post('/insert',isLoggedIn, function(req, res, next){
			var stringObject = new StringObject();
			stringObject.initForView(req.body);
			if(stringObject.getValue()==""|| stringObject.getKey()=="")
			{

			}
			else{
					dbUtil.insertdb(stringObject,function (){
            res.redirect('/');
          });
			}

});

router.get('/generateIos',isLoggedIn, function(req, res, next) {

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

router.get('/generateAndroid',isLoggedIn, function(req, res, next) {

		var downloadBlock = function(){
			res.download(andriodFile, function(err){
			if (err) {
				console.log(err);
			} else {
				console.log('success');
			}
		});
		};

		createAndroidFile(downloadBlock);

});


module.exports = router;
