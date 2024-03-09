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
    proxy: {
      "/recommendation": {
     target: "http://localhost:3000",
     secure: false,
      },
     "/session": {
     target: "http://localhost:3000",
     secure: false,
      },
      },
  },

  plugins: [
    // new CleanWebpackPlugin(), //<-- deleting dist folder contents when running sever
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
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
        test: /\.(css|sass|scss)$/,
        // excluding everything under node_modules except /bootstrap
        exclude: /node_modules(?!\/bootstrap)/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};