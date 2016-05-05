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
	    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
	    { test: /\.json$/, loader: 'json-loader'},
	  	{ test: /\.(scss|css)$/, exclude: /node_modules/, loader: 'style-loader!css-loader!sass-loader' }
	  ]
	}
};
