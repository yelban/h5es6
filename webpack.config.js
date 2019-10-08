const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const styleLoader = process.env.BUILD_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader

module.exports = {
    // context: path.resolve(__dirname, '../'),    // webpack.config.js in subdirectory
    entry: {
        app: './src/app.js'    // 引入檔案相對於 context 所在路徑
    },
    output: {
        // path: path.resolve(__dirname, 'dist'),   // 輸出目錄的配置，模板、樣式、腳本、圖片等資源的路徑配置都相對於它
        filename: 'js/bundle.js',
        publicPath: '/', // 模板、樣式、腳本、圖片等資源對應的server上的路徑
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(less|css)$/,
                use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        // 除了img的src,還可以繼續配置處理更多html引入的資源(不能在頁面直接寫路徑,又需要webpack處理怎麼辦?先require再js寫入).
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: false,
                        removeComments: true,
                        collapseWhitespace: false
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/images/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/media/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css', // 注意這裡使用的是 contenthash，否則任意的 js 改動，打包時都會導致 css 的檔名也跟著變動
            chunkFilename: 'css/[name].[contenthash:7].css',
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true,
            //     removeRedundantAttributes: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     useShortDoctype: true
            // },
        }),
    ],
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),    // 告訴服務器從哪裡提供內容(默認當前工作目錄)
        // watchContentBase: true, // contentBase下文件變動將reload頁面(默認false)
        inline: true, // 可以監控 js 變化
        hot: true, // 熱啟動
        open: true, // 啟動時自動打開瀏覽器
        before(app, server) {
            server._watch('src/**.html');
        }
    }
};
