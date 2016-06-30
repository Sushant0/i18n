
var key;
var value;
var type;

OBJ = function(valueJson){
	key = valueJson.key
	value = valueJson.value
	type = valueJson.type;
};

OBJ.prototype.getKey = function(){
	return key;
}

OBJ.prototype.setKey = function(value){
	key = value;
}

OBJ.prototype.getValue = function(){
	return value;
}

OBJ.prototype.setValue = function(val){
	value = val;
}

OBJ.prototype.getType = function(){
	return type;
}

OBJ.prototype.setType = function(value){
	type = value;
}

module.exports = OBJ;
