module.exports = {
  context: __dirname,
  entry: "./skeleton/js/main.js",
  output: {
    path: "./skeleton/js",
    filename: "bundle.js",
  },
  devtool: "source-maps",
};

// NOTE: `context` and `path` are relative to this config file.
