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
	    { test: /\.js$/, include: /js/, exclude: /node_modules/, loader: 'babel-loader'},
	    { test: /\.json$/, include: /js/, exclude: /node_modules/, loader: 'json-loader'},
	  	{ test: /\.(css|scss)$/, include: /js/, exclude: /node_modules/, loader: 'style-loader!css-loader!sass-loader' }
	  ]
	}
};
