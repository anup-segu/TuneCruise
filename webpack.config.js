module.exports = {
  context: __dirname,
  entry: "./lib/tune_cruise.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
  	filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps',
};
