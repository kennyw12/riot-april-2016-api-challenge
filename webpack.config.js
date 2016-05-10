module.exports = {
  entry: {
    application: './js/app/components/application.js'
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  module: {
	  loaders: [
	    { test: /\.js$/, include: /js/, loader: 'babel-loader'},
	    { test: /\.json$/, include: /js/, loader: 'json-loader'},
	  	{ test: /\.(scss|css)$/, include: /js/, loader: 'style-loader!css-loader!sass-loader' }
	  ]
	}
};
