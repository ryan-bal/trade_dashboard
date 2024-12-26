const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Enable importing JS and JSX files without specifying extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use a template HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from 'dist'
    port: 3000, // Development server port
  },
  mode: 'development', // Set mode to 'development'
};
