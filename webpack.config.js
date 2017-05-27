var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
var bootstrapEntryPoints=require('./webpack.bootstrap.config.js');


var providePlugin = new webpack.ProvidePlugin({
	$:'jquery',
	jQuery:'jquery',
	'window.jQuery':'jquery',
	'window.$':'jquery'
})

module.exports = {
	//页面入口文件配置
	entry:[
		//'bootstrap-loader',
		bootstrapEntryPoints.dev,
		path.join(__dirname,'app')],
	//入口文件输出配置
	output:{
		path:path.join(__dirname,'build'),//打包后的文件存放的地方
		filename:'app.js',//打包后输出文件的文件名
		publicPath:'/assets/'
	},
	//插件项
	plugins:[
		providePlugin
		/*new webpack.LoaderOptionsPlugin({
			options:{
				devServer:{
					inline:true,
					historyApiFallback:true
				}
			}
		})*/	
	],
	//require('react')作为全局的React变量，不做处理
	/*externals:{
		react:'React'
	},*/
	module:{
		//加载器
		loaders:[
			//.css文件用style-loader和css-loader来编译处理
			{test:/\.css$/,loader:'style-loader!css-loader'},
			//.js文件用jsx-loader来编译处理
			{
				test:/\.(js|jsx)$/,
				loader:'babel-loader',
				exclude:/(node_modules|bower_components)/,
				query:{
					presets:['es2015','react']				
				}//将react编译成js文件
			},
			//.scss文件用style-loader、css-loader和sass-loader来编译处理
			{test:/\.scss$/,loader:'style-loader!css-loader!scss-loader?sourceMap'},
			//图片文件使用url-loader来处理,小于８kb的直接转为base64
			{test:/\.(png|jpg)/,loader:'url-loader?limit=8192'},
			{test:/\.html/,loader:'html-loader'},
			//使用react需要expose加载器
			{test:require.resolve('react'),loader:"expose-loader?React"},
			{test:require.resolve('jquery'),loader:'expose-loader?$!expose-loader?jQuery'},
			{test:require.resolve('react-bootstrap'),loader:'expose-loader?ReactBootstrap'},
			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,loader:'url-loader?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,loader: 'file-loader'}, 
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,loader: "url-loader?limit=10000&mimetype=image/svg+xml"} 
			//多个loader之间用"!"连接
		]
	},
	//其他解决方案配置
	/*resolve:{
		root:'/home/megamind/PycharmProjects/LR-front/src',
		extensions:['','.js','.json','.scss'],
		alias:{
			AppStore:'js/stores/AppStores.js',
			ActionType:'js/actions/ActionType.js',
			AppAction:'js/actions/AppAction.js'
		}
	},*/
	devServer:{
		inline:true,
		historyApiFallback:true,
		//contentBase:path.join(__dirname,'/build'),
		port:9000
	}
};
