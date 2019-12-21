const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    syntax: 'postcss-scss',
    plugins: () => [
      require('postcss-import')({
        path: ['src']
      }),
      require('precss')(),
      require('postcss-px-to-viewport')({
        viewportWidth: 414,
        viewportUnit: 'vmin'
      }),
      require('autoprefixer')({
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ],
        grid: true
      }),
    ]
  }
};

const templateFunction = function(data) {
  var ratina = 2; // 两倍图
  var shared = '.ico { background-image: url(I); background-size: Wpx Hpx; display: inline-block; }'
    .replace('I', data.sprites[0].image)
    .replace('W', data.sprites[0].total_width / ratina)
    .replace('H', data.sprites[0].total_height / ratina);

  var perSprite = data.sprites.map(function (sprite) {
    return '.N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width / ratina)
        .replace('H', sprite.height / ratina)
        .replace('X', sprite.offset_x / ratina)
        .replace('Y', sprite.offset_y / ratina);
  }).join('\n');

  return shared + '\n' + perSprite;
};

const spritePlugin = new SpritesmithPlugin({
  src: {
    cwd: path.resolve(__dirname, 'src/assets/images/sprite'),
    glob: '*.png'
  },
  target: {
    image: path.resolve(__dirname, 'src/assets/sprite.png'),
    css: [
          [path.resolve(__dirname, 'src/assets/sprite.css'), { format: 'function_based_template' }],
          [path.resolve(__dirname, 'src/assets/sprite.json'), { format: 'json_texture' }]
    ]
  },
  apiOptions: {
    cssImageRef: "assets/sprite.png"
  },
  customTemplates: {
    'function_based_template': templateFunction
  },
  spritesmithOptions: {
    padding: 4,
  }
});

module.exports = (config, options) => {

  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== '/\\.scss$|\\.sass$/' && rule.test.toString() !== '/\\.css$/'
  );

  // CSS Module support
  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      postcssLoader
    ]
  });

  // SASS Module support
  config.module.rules.push({
    test: /\.(scss|sass)$/,
    use: [
      'to-string-loader',
      'css-loader',
      'sass-loader',
      postcssLoader
    ],
  });

  config.plugins.push(spritePlugin);

  return config
};
