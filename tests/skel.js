var skel = require('../generators/skel.js'),
	fs = require('fs'),
	should = require('should');

describe('Base Skeleton', function(){
	var path = '/tmp';
	var name = 'An App';
	var resultPath = '';

	beforeEach(function(done){
		skel.base(path, name, function(error, result){
			if(error) return done(error);
			resultPath = result;
			done();
		});
	})

	it('should generated without error', function(done){
		fs.exists(resultPath, function (exists) {
		  exists.should.be.true;
		  fs.exists(resultPath + '/assets', function(exists){
		  	exists.should.be.true;
		  	fs.exists(resultPath + '/assets/images', function(exists){
			  	exists.should.be.true;
			  	fs.exists(resultPath + '/assets/javascripts', function(exists){
				  	exists.should.be.true;
				  	fs.exists(resultPath + '/assets/stylesheets', function(exists){
					  	exists.should.be.true;
		  				done();
					  });
				  });
			  });
		  });
		});
	})
})