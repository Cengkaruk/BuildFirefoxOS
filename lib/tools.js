var util = require('util'),
	fs = require('fs');

/**
 * Wrapper for formatting the message of an Error object
 * 
 * @param {String} message
 * @returns {Object}
 */
var formattedError = function () {
	return new Error(util.format.apply(this, arguments));
};
exports.formattedError = formattedError;

/**
 * List recursive directory
 *	path: string of application directory
 * Results as
 *	error
 *	results: Array of result
 */
var listRecursive = function(path, callback){
	var results = []
 	fs.readdir(path, function(error, list){
 		if(error) return callback(error);

 		var pending = list.length;
 		if(!pending) return callback(null, results);

 		list.forEach(function(file){
 			file = path + '/' + file;
 			fs.stat(file, function(error, status){
 				if(status && status.isDirectory()){
 					listRecursive(file, function(error, res){
 						results = results.concat(res);
 						if(!--pending) callback(null, results);
 					});
 				} else {
 					results.push(file);
 					if(!--pending) callback(null, results);
 				}
 			});
 		});
 	});
}
exports.listRecursive = listRecursive;