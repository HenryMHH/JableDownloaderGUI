const path = require('path')

module.exports = {
	mode: 'production',
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
	watch: true,
	watchOptions: {
		poll: 200,
		ignored: '**/node_modules',
	},
}
