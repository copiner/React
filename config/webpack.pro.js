const Webpack = require('webpack');
const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: {
     app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle-[hash].js',
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

                  MiniCssExtractPlugin.loader,

                  // Translates CSS into CommonJS
                  'css-loader'
                ]
            }
        ]
    },
    plugins: [
         new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'Hello World',
            filename: 'index.html'
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'index-[hash].css',
            chunkFilename: 'index-[id].css',

            ignoreOrder: false, // Enable to remove warnings about conflicting order
          })
     ],
     optimization: {
       splitChunks: {
           chunks: "all",// all async initial
           minSize: 30000,
           maxSize: 0,
           minChunks: 1,
           maxAsyncRequests: 5,
           maxInitialRequests: 3,
           automaticNameDelimiter: "~",
           name: true,
           cacheGroups: {
               vendors: {
                   test: /[\\/]node_modules[\\/]/,
                   //test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                   priority: -10
                   //filename: 'vendors.js'
               },
               default: {
                   minChunks: 2,
                   priority: -20,
                   reuseExistingChunk: true
                   //filename: 'common.js'
               }
           }
       }
    }
}
