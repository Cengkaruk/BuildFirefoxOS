var tools = require('./tools.js');

var fs = require('fs');

/* Generate manifest.webapp
 *	path: string of app directory
 * 	data: object of
 *		version
 *		name
 *		description
 *		launch_path
 *		icons: object of
 *			16
 *			48
 *			128
 *		developer: object of
 *			name
 *			url
 *		default_locale
 *		installs_allowed_from
 *		locales
 *		permisions: object of permisions
 * Results
 *	error
 *	fullpath: String of webapp path
 */
var webapp = function(path, data, callback) {
	// Minimal manifest
	// https://developer.mozilla.org/en-US/docs/Web/Apps/Manifest?redirectlocale=en-US#Example_manifest
	if( ! data.name) {
		callback(tools.formattedError('The data object requires an name value.'));
		return;
	}

	if( ! data.description) {
		callback(tools.formattedError('The data object requires an description value.'));
		return;
	}

	if( ! data.launch_path) {
		callback(tools.formattedError('The data object requires an launch_path value.'));
		return;
	}

	if( ! data.icons) {
		callback(tools.formattedError('The data object requires an icons.128 value.'));
		return;
	}

	if( ! data.developer) {
		callback(tools.formattedError('The data object requires an developer.name and developer.url value.'));
		return;
	}

	if( ! data.default_locale) {
		callback(tools.formattedError('The data object requires an default_locale value.'));
		return;
	}

	data = JSON.stringify(data, null, 4);
	var fullpath = path + '/manifest.webapp';

	fs.writeFile(fullpath, data, function(error){
		if(error) return callback(error, fullpath);
		return callback(null, fullpath);
	});
}
exports.webapp = webapp;

/*
 *	Generate manifest.appcache
 *		path: string of app directory
 * 	Results
 *		error
 *		fullpath: String of appcache path
 */
var appcache = function(path, callback){
	var fullpath = path + '/manifest.appcache';

	tools.listRecursive(path, function(error, results){
		if(error) return callback(error);

		var manifest = 'CACHE MANIFEST\n';
		results.forEach(function(result){
			manifest = manifest + result + '\n';
		});

		fs.writeFile(fullpath, manifest, function(error){
			if(error) return callback(error, fullpath);
			return callback(null, fullpath);
		});
	});
}
exports.appcache = appcache;		