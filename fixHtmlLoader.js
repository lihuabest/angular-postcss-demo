var fs = require('fs')
var filepath = './node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';

fs.readFile(filepath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/raw-loader/g, 'html-loader');

  fs.writeFile(filepath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
