import { version as runtimeVersion } from '@babel/plugin-transform-runtime/package.json';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { version as corejsVersion } from 'core-js/package.json';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration as Config, DefinePlugin, ids } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const { HashedModuleIdsPlugin } = ids;

const config: Config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    // 模块编译规则
    rules: [
      {
        test: /\.(mjs|js)$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: corejsVersion, proposals: true },
                  modules: false,
                },
              ],
              [
                '@babel/preset-react',
                {
                  // react17之后可以直接使用jsx无需显式引入React，需要设置此配置支持
                  // 默认为 classic，babel8中默认选项将改为 automatic
                  runtime: 'classic',
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [['@babel/plugin-transform-runtime', { version: runtimeVersion }]],
            targets: {
              chrome: '60',
            },
          },
        },
      },
      {
        test: /\.(js|cjs|mjs)?$/,
        include: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: corejsVersion, proposals: true },
                },
              ],
            ],
            plugins: [['@babel/plugin-transform-runtime', { version: runtimeVersion }]],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 这个选项需要开着，antd需要
                math: 'parens-division',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于 10kb 则通过 dataUrl 的形式内联到 bundle 中
            // 大于 10kb 以输出为单独的图片文件
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    // usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多进程处理，默认值即为 true
      }),
      new CssMinimizerPlugin(),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 102400,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 6,
    // },
  },
  resolve: {
    // 增加别名设置，使引用模块简单
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      types: path.resolve(__dirname, '../src/types/'),
      assets: path.resolve(__dirname, '../src/assets/'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
      chunkFilename: 'static/[id].[contenthash].css',
    }),
    new DefinePlugin({
      'process.env': {
        PROJECT_ENV: JSON.stringify(process.env.PROJECT_ENV),
      },
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      filename: 'index.html',
    }),
    // 清除打包结果
    new CleanWebpackPlugin(),
    // gzip
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // 优化hash生成
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
  // 控制台展示设置
  stats: 'minimal',
};

export default config;
