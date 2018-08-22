const fs = require('fs')
const path = require('path')
const commonPath = '../node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';

// 读取自定义文件
fs.readFile(path.join(__dirname, './common.js'), 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    // 写入目标文件
    fs.writeFile(path.join(__dirname, commonPath), data, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});



const stylesPath = '../node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js';

// 读取自定义文件
fs.readFile(path.join(__dirname, './styles.js'), 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    // 写入目标文件
    fs.writeFile(path.join(__dirname, stylesPath), data, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
