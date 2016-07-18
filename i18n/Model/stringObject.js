
var key = "";
var value = "";
var is_IOS = false;
var is_Android = false;
var is_verified = false;

StringObject = function(){
	this.key = "";
	this.value = "";
	this.is_IOS = false;
	this.is_Android = false;
	this.is_verified = false;
};

StringObject.prototype.initForDB = function(valueJson){
	this.key = valueJson.key;
	this.value = valueJson.value;
	this.is_IOS = valueJson.isIOS;
	this.is_Android = valueJson.isAndroid;
	this.is_verified = valueJson.isVerified;
};

StringObject.prototype.initForView = function(valueJson){
	this.key = valueJson.key;
	this.value = valueJson.value;
	this.is_IOS = valueJson.hasOwnProperty('isIOS');
	this.is_Android = valueJson.hasOwnProperty('isAndroid');
	this.is_verified = valueJson.hasOwnProperty('isVerified');
}

StringObject.prototype.getKey = function(){
	return this.key;
}

StringObject.prototype.setKey = function(value){
	this.key = value;
}

StringObject.prototype.getValue = function(){
	return this.value;
}

StringObject.prototype.setValue = function(val){
	this.value = val;
}

StringObject.prototype.getType = function(){
	return this.type;
}

StringObject.prototype.setType = function(value){
	this.type = value;
}

StringObject.prototype.getIsAndroid = function(){
	return this.is_Android;
}

StringObject.prototype.setIsAndroid = function(value){
	this.is_Android = value;
}

StringObject.prototype.getIsIOS = function(){
	return this.is_IOS;
}

StringObject.prototype.setIsIOS = function(value){
	this.is_IOS = value;
}

StringObject.prototype.getIsVerified = function(){
	return this.is_verified;
}

StringObject.prototype.setIsVerified = function(value){
	this.is_verified = value;
}

StringObject.prototype.update = function(value){
	console.log("update");
}

module.exports = StringObject;
