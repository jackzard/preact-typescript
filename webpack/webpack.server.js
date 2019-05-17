const path = require('path')
const NodeExternals = require('webpack-node-externals')
const util = require('./webpack.util')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: [
		'./src/server.tsx'
	],
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'server.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [
			new TsConfigPathsPlugin(),
		]
	},
	externals: [
		NodeExternals()
	],
	plugins: [
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: ['babel-loader', 'awesome-typescript-loader']
			},
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: path.resolve(__dirname, './loaders/isomorphic-style-loader.min.js')
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 5,
							modules: true,
							camelCase: true,
							getLocalIdent: util.getLocalIndent(),
						}
					},
					{
						loader : 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					}
				]
			}
		]
	},
}
