const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: { renderer: './src/renderer.ts', preload: './src/preload.ts', main: './src/main.ts' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
	},
	target: ['electron-main', 'electron-renderer'],
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	watch: true,
	watchOptions: {
		poll: 200,
		ignored: '**/node_modules',
	},
}
