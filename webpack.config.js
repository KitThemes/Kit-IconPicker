const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const path = require( 'path' );
const npmPackage = require( './package.json' );

const min = process.env.NODE_ENV === 'production' ? '.min' : '';

const cssPlugin = new MiniCssExtractPlugin( {
	path: __dirname,
	filename: `build/css/[name]${ min }.css`,
	chunkFilename: '[id].css',
} );

module.exports = {
	entry: {
		'kit-iconpicker': './src/index.js',
	},
	output: {
		path: __dirname,
		filename: `build/js/[name]${ min }.js`,
		libraryTarget: 'umd',
		library: 'kitIconPicker',
		libraryExport: 'default',
		umdNamedDefine: true,
		globalObject: `(typeof self !== 'undefined' ? self : this)`,
	},
	optimization: {
		minimizer: [ new TerserJSPlugin(), new OptimizeCSSAssetsPlugin() ],
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
							// data: '@import "color"; @import "variables"; @import "mixins";',
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
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	devServer: {
		contentBase: path.join( __dirname, 'examples' ),
	},
};
