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

const spritePlugin = new SpritesmithPlugin({
  src: {
    cwd: path.resolve(__dirname, 'src/assets/images'),
    glob: '*.png'
  },
  target: {
    image: path.resolve(__dirname, 'src/assets/sprite.png'),
    css: [
          path.resolve(__dirname, 'src/assets/sprite.css'),
          [path.resolve(__dirname, 'src/assets/sprite.json'), { format: 'json_texture' }]
    ]
  },
  apiOptions: {
    cssImageRef: "assets/sprite.png"
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
