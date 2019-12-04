// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "parser": "postcss-scss", // 支持行内双斜线注释 sass语法的嵌套
  "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {},
      "postcss-write-svg": {
          utf8: false
      },
      // "postcss-cssnext": {}, // 这个插件目前加了要报错，现在还没结局
      "postcss-px-to-viewport": { // 最主要的就是px转vm的插件
          viewportWidth: 750, // (Number) The width of the viewport.
          viewportHeight: 1334, // (Number) The height of the viewport.
          unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
          viewportUnit: 'vw', // (String) Expected units.
          selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
          minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
          mediaQuery: false // (Boolean) Allow px to be converted in media queries.著作权归作者所有。
      },
      // "postcss-viewport-units": {}, // 这个插件目前加了要报错，现在还没结局
      // "cssnano": { // 这个插件目前加了要报错，现在还没结局
      //     preset: "advanced",
      //     autoprefixer: false,
      //     "postcss-zindex": false
      // },
      "postcss-mixins": {}, // postcss-mixins 和 postcss-nested 配合，可以使用宏定义
      "postcss-nested": {}
  }
}
