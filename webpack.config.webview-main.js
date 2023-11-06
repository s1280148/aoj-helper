const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  mode: "none",
  entry: "./src/webview-main-src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/webview-main-src"),
    filename: "webview-main.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.webview.json",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    static: path.join(__dirname, "/dist"),
    open: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/webview-main-src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./webview-main.css",
    }),
  ],
};

module.exports = [config];
