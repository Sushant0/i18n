
var key = "";
var value = "";
var type = 0;

OBJ = function(valueJson){
	this.key = valueJson.key
	this.value = valueJson.value
	this.type = valueJson.type;
};

OBJ.prototype.getKey = function(){
	return this.key;
}

OBJ.prototype.setKey = function(value){
	this.key = value;
}

OBJ.prototype.getValue = function(){
	return this.value;
}

OBJ.prototype.setValue = function(val){
	this.value = val;
}

OBJ.prototype.getType = function(){
	return this.type;
}

OBJ.prototype.setType = function(value){
	this.type = value;
}

module.exports = OBJ;
