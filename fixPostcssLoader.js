var fs = require('fs')
var filepath = './node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js';

fs.readFile(filepath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let result = [];
  data.toString().split('\n').forEach((line, index) => {
    if (index > 191 && index < 201) {
        line = '// ' + line;
    }
    if (index === 201) {
        result.push(`
            {
                loader: 'to-string-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    minimize: false
                }
            },
            {
                loader: 'postcss-loader'
            },
        `);
    }

    result.push(line);
  });

  fs.writeFile(filepath, result.join('\n'), 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
