// var path = require('path');
// var webpack = require('webpack');
// var ExtractText = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		index: ['babel-polyfill', './index.js'],
	},
	output: {
		filename: '[name].bundle.js',
		path: 'dist'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2'],
					plugins: ["transform-export-extensions"],
				}
			},
			// {
			// 	test: /\.(scss|sass)$/,
			// 	loader: ExtractText.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
			// }
		]
	},
	// plugins: [
	// 	new ExtractText({
	// 		filename: '[name].min.css',
	// 		// allChunks: true
	// 	}),
	// 	// new webpack.optimize.DedupePlugin(),
	// 	// new webpack.optimize.OccurenceOrderPlugin(),
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		compress: {
	// 			warnings: false
	// 		},
	// 		sourceMap: true,
	// 	})
	// ],
}
