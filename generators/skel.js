var mkdir = require('mkdirp'),
	slug = require('slug');

/* Create app skeleton
 *	path: String of build path
 *	name: String of application name
 * Results
 *	error
 *	path: String of app directory path
 */
var base = function(path, name, callback){
	name = slug(name);
	path = path + '/' + name;
	mkdir(path, 0755, function(error){
		if(error) return callback(error);
		mkdir(path + '/assets', 0755, function(error){
			if(error) return callback(error);
			mkdir(path + '/assets/javascripts', 0755, function(error){
				if(error) return callback(error);
				mkdir(path + '/assets/images', 0755, function(error){
					if(error) return callback(error);
					mkdir(path + '/assets/stylesheets', 0755, function(error){
						if(error) return callback(error);
						return callback(error, path);
					});
				});
			});
		});
	});
}
exports.base = base;