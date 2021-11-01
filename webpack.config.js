const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  // devServer: {
  //   // static: {
  //   //   directory: path.join(__dirname, 'client', 'dist'),
  //   // },
  //   // compress: true,
  //   // port: 9000,
  //   // open: true,
  //   historyApiFallback: true,
  // },
  devServer: {
    historyApiFallback: {
      index: '/'
    },
    contentBase: './',
    hot: true
 },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx|svg)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],

        },
      },
    },
    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        },
      ],
    },
    ],
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: 'app/index.html'
    //   })
    // ]
  },
};