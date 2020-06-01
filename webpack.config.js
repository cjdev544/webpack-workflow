const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/script.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
              publicPath: '../'
            }
          },
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eof|woff2?|mp4|mp3|txt|xml|pdf)$/i,
        use: 'file-loader?name=../assets/[name].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      options: { minimize: true }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new webpack.SourceMapDevToolPlugin({})
  ],
  devtool: false
}