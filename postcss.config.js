module.exports = {
    // parser: 'sugarss', // 是一個以縮進為基礎的語法，類似於 Sass 和 Stylus，https://github.com/postcss/sugarss
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': {},
        'postcss-flexbugs-fixes': {},
    }
}
