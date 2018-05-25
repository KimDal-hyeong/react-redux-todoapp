const {
  HotModuleReplacementPlugin,
} = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    __dirname + '/src/index.js',
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + '/build',
  },
  devServer: {
    contentBase: __dirname + '/build',
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ]
};