const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './client/index.js',
  },
  
  devtool: 'inline-source-map',

  devServer: {
    // // uncomment when serving bundled files directly from /dist after building
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    // }

    // // for some reason HMR does not work properly. So liveReload is being used (hot has to be set to false to make liveReload work)
    hot: false,
    liveReload: true,
    client: {
      progress: true,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  mode:'development',

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
          }
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};