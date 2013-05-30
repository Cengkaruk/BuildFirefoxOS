var manifest = require('../lib/manifest.js'),
	fs = require('fs'),
	should = require('should');

describe('Webapp Manifest', function(){
	var path = '/tmp';
	var data = {
		name: 'Manifest Test',
		description: 'Test the manifest generator',
		launch_path: '/',
		icons: {
			128: '/dummies/path/icon-128.png'
		},
		developer: {
			name: 'Developer Name',
			url: 'http://foo.com'
		},
		default_locale: 'en'
	};
	var generatedFile = path + '/manifest.webapp';

	beforeEach(function(done){
		manifest.webapp(path, data, function(error){
			if(error) return done(error);
			done();
		});
	})

	it('should generated without error', function(done){
		fs.exists(generatedFile, function (exists) {
		  exists.should.be.true;
		  done();
		});
	})
})

describe('Appcache Manifest', function(){
	var path = '/tmp';

	beforeEach(function(done){
		manifest.appcache(path, function(error){
			if(error) return done(error);
			done();
		});
	})

	var generatedFile = path + '/manifest.appcache';
	it('should generated without error', function(done){
		fs.exists(generatedFile, function (exists) {
		  exists.should.be.true;
		  done();
		});
	})
})