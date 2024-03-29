const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_env, options) => {
  const NODE_ENV = options.mode || "development";
  console.log("NODE_ENV: ", NODE_ENV);
  const PROD = NODE_ENV == "production";

  const publicPath = `./dist/`;

  return {
    entry: "./src/index.tsx",
    output: {
      filename: PROD ? "index.js" : "[name].[contenthash].js",
      path: path.resolve(__dirname, publicPath),
      publicPath: "/",
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: PROD ? "style.css" : "[name].[contenthash].css",
        chunkFilename: "[id].[chunkhash].css",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./index.html" }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.mod\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]--[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.mod\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif|mp4|webm)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: `${publicPath}/images/`,
                publicPath: "/images/",
                name: (_file) => {
                  if (NODE_ENV === "development") {
                    return "[name].[ext]";
                  }

                  return "[contenthash].[ext]";
                },
              },
            },
          ],
        },
      ],
    },

    stats: { children: false },
    devServer: {
      compress: true,
      host: "localhost",
      port: 8080,
      historyApiFallback: true,
    },
  };
};
