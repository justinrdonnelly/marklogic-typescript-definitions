/*jshint node: true */

'use strict';

var gulp = require('gulp');

var argv = require('yargs').argv;
var fs = require('fs');
var request = require('request');
var through = require('through2');
var typescript = require('gulp-tsc');

var onError = function(err) {
  if (err) {
    console.log(err);
  }
};

var options = {
  mlHost: argv['ml-host'] || 'ml8-ml1',
  mlPort: argv['ml-port'] || '8000',
  mlUser: argv['ml-user'] || 'admin',
  mlPass: argv['ml-pass'] || 'admin'
};


gulp.task('generate', function(){
  var query;
  
  fs.readFile('qconsole/generate-definitions.xqy', null, function(err, data) {
    query = data.toString();
  });
  
  return gulp.src(['xml/**/*.xml'])
  .pipe(through.obj(function (file, enc, cb) {
  
    console.log(file.path);
  
    var outFile = file.path.replace('/xml/', '/ts/').replace('.xml', '.d.ts');
  
    var xml = file.contents.toString();
    var escapedXml = xml.replace(/\\/gm, '\\\\').replace(/"/gm, '\\"').replace(/(\n\r|\r\n|\n|\r)/gm, '\\n').replace(/\t/gm, '\\t');
    
    request({
      method: 'POST',
      url: 'http://' + options.mlHost + ':' + options.mlPort + '/v1/eval',
      form: {
        xquery: query,
        vars: '{ xml: "'+ escapedXml +'"}'
      },
      auth: {
        user: options.mlUser,
        pass: options.mlPass,
        sendImmediately: false
      }
    }, function(err, httpResponse, body) {
      // get rid of multipart response wrapping
      body = body.replace(/^([^\r]*\r\n){5}/, '').replace(/\r\n[^\r]*\r\n$/, '');
      
      if (err || httpResponse.statusCode !== 200) {
        console.log('FAILED!');
        console.log(body);
        //console.log(escapedXml);
      } else {
        fs.writeFile(outFile, body, onError);
      }
    });
  
    cb(null, file);
  }));
});

gulp.task('validate', function(){
  gulp.src(['ts/**/*.ts'])
  .pipe(typescript());
});

// Default Task
gulp.task('default', ['generate', 'validate']);