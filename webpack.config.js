var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: {
    app: "./src/index.js",
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.js",
  },

  mode: "development",

  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    port: 1239,
    writeToDisk: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              },
            },  
          "css-loader"
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
          use: {
            loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
          }
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                  name:'[name].[ext]',
                  outputPath: "images",
            }
          },
        ],
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: "fonts",
              esModule: false,
            }
          },
        ],
      },

      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      }, 

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    new HtmlWebpackPlugin({
      filename: "product.html",
      template: "./src/product.html",
    }),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new OptimizeCssAssetsPlugin({}),
  ],
};
