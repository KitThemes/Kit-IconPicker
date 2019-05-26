const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const npmPackage = require( './package.json' );

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
		new webpack.BannerPlugin( {
			banner: `Kit IconPicker v${ npmPackage.version }\nCopyright 2019 KitThemes (https://www.kitthemes.com/)\nLicensed under MIT (https://github.com/kitthemeslab/Kit-IconPicker/blob/master/LICENSE)`,
		} ),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	mode: 'development',
	devServer: {
		contentBase: path.join( __dirname, 'examples' ),
	},
};
