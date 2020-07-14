const Webpack = require('webpack');
const { resolve } = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: {
     app:[ './src/index.js']
  },
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'bundle-[hash].js',
    chunkFilename: '[name].bundle.js',
    publicPath:'/'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]'
                  }
                },
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8*1024
                  }
                }
              ]
            },
            {
                test: /\.css$/,
                use: [
                  //'style-loader',
                  MiniCssExtractPlugin.loader,

                  {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 1
                    }
                  },
                  { loader: 'postcss-loader' }
                ]
            }
        ]
    },
    plugins: [
         new HtmlWebpackPlugin({ // 打包输出HTML
           title: 'Hello World',
           template:'./public/index.html',
           filename: "index.html",
           favicon: "./public/favicon.ico"
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
            ignoreOrder: false
        })
        //new BundleAnalyzerPlugin()
    ],
    optimization: {
       splitChunks: {
         chunks: 'async',
         minSize: 30000,
         maxSize: 0,
         minChunks: 1,
         maxAsyncRequests: 5,
         maxInitialRequests: 3,
         automaticNameDelimiter: '-',
         name: true,
         cacheGroups: {
           vendor: {
             //第三方依赖
             priority: 1,
             name: 'vendor',
             test: /node_modules/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1 //重复引入了几次
           },
           lodash: {
             name: "lodash", // 单独将lodash拆包
             priority: 5, // 权重需大于`vendor`
             test: /[\\/]node_modules[\\/](lodash)[\\/]/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1
           },
           react: {
             name: "react",
             priority: 5, // 权重需大于`vendor`
             test: /[\\/]node_modules[\\/](react|redux)[\\/]/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1
           },
           default: {
             minChunks: 2,
             priority: -20,
             reuseExistingChunk: true
           }
         }
       }
     }
}
