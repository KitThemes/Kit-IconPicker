const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );

const cssPlugin = new MiniCssExtractPlugin( {
	path: __dirname,
	filename: 'build/css/[name].css',
	chunkFilename: '[id].css',
} );

module.exports = {
	entry: {
		'kit-iconpicker': './src/index.js',
	},
	output: {
		path: __dirname,
		filename: 'build/js/[name].js',
		libraryTarget: 'umd',
		library: 'kitIconPicker',
		libraryExport: 'default',
		umdNamedDefine: true,
		globalObject: `(typeof self !== 'undefined' ? self : this)`,
	},
	module: {
		rules: [
			{
				test: /(.jsx)|(.js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						query: {
							includePaths: [ 'src/scss' ],
							data: '@import "color"; @import "variables"; @import "mixins";',
						},
					},
				],
			},
		],
	},
	plugins: [
		cssPlugin,
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	mode: 'development',
	devServer: {
		contentBase: path.join( __dirname, 'examples' ),
	},
};
