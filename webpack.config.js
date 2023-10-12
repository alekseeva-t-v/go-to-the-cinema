const config = {
  mode: 'production',
  entry: {
    index: './src/js/index.js',
    hall: './src/js/hall.js',
    payment: './src/js/payment.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;
