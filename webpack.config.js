const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 实例化插件
const extractLess = new ExtractTextPlugin({
  filename: "../style/[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    index: './src/scripts/index.js',
    vendor: ['react','react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/scripts')
        ],
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [ 
    extractLess,
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ["vendor"]
    // }),
    
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, 
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
  // externals: { // 扩展依赖，key写依赖的包的名字，value写依赖暴露出来的名字
  //   "react": "React",
  //   "react-dom": "ReactDom"
  // }
};
