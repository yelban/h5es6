const presets = [
    [
        "@babel/preset-env",
        {
            // targets: {
            //     ie: "11",
            //     edge: "17",
            //     firefox: "50",
            //     chrome: "67",
            //     safari: "11.1",
            //     // "browsers":[">1%","last 2 versions"],
            // },
            // "corejs": 
            // {
            //   "version": "3", // 使用core-js@3
            //   "proposals": true,
            // },
            // useBuiltIns: "entry",
            // false: 需在 js 程式碼 import '@babel/polyfill', 導入全部墊片 ( 覆蓋到所有 API 的轉譯, 體積最大 )
            // entry: 需在 js 程式碼 import '@babel/polyfill', 導入 browserslist 環境不支援的所有墊片 (支援 'hello'.includes('h') 語法, 體積中等)
            // usage: 不需在 js 程式碼 impost, 自動將程式碼有用到但 browserslist 環境不支援的墊片導入 ( 不支援 'hello'.includes('h') 語法, 體積最小 )
            // 
            // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
            // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
            "modules": false, // 對ES6的模塊文件不做轉化，以便使用tree shaking、sideEffects等
        },
        // 自動載入需要的 polyfill，無需手動引入 @babel/polyfill
    ],
];

const plugins = [
    [
        "@babel/plugin-transform-runtime",
        {
            // corejs: "3",
            "corejs": {
                "version": 3,
                "proposals": true
            },
            "useESModules": true
        },
    ]
];

module.exports = { presets, plugins };
