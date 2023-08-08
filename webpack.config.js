const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, 'minesweeper/src/index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'minesweeper/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /.html$/i,
        use: [{loader: 'html-loader', options: {minimize: true}}],
      },
      {
        test: /.css$/i,
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },

    ]
  },
};

