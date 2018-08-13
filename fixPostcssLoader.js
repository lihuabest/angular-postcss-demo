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
    if (index === 201) { // 同理，如果angular.json里配置的css也需要postcss编译，就修改文件里 extractTextPlugin里的配置
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

    if (index > 213 && index < 223) {
        line = '// ' + line;
    }

    if (index === 233) {
        result.push(`
            'css-loader',
            'postcss-loader',
        `);
    }

    result.push(line);
  });

  fs.writeFile(filepath, result.join('\n'), 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
